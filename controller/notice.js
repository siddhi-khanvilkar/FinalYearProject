const path = require('path');
const fs = require('fs');
const db = require('../db'); 


exports.uploadnotice = (req, res) => {
    try {
        const { title, date } = req.body;
        const noticePDF = req.file;

        if (!noticePDF) {
            return res.status(400).send('No file uploaded.');
        }

        const uploadDir = path.join(__dirname, '../public/uploads/notices');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        // unique filename
        const fileName = `${Date.now()}_${noticePDF.originalname}`;
        const filePath = path.join(uploadDir, fileName);
        fs.writeFileSync(filePath, noticePDF.buffer);

        // Save in DB
        const sql = 'INSERT INTO notices (title, date, filename) VALUES (?, ?, ?)';
        const values = [title, date, fileName];

        db.query(sql, values, (err, result) => {
            if (err) {
                console.error('Database insert error:', err);
                return res.status(500).send('Error saving notice to database.');
            }

            console.log('Notice saved with ID:', result.insertId);
            res.send('Notice uploaded successfully.');
        });

    } catch (err) {
        console.error('Upload error:', err);
        res.status(500).send('Server error during upload.');
    }
};



exports.getNotices = (req, res) => {
    const sql = "SELECT id, title, date, created_at FROM notices ORDER BY created_at DESC";
    db.query(sql, (err, results) => {
        if (err) {
            console.error("Database fetch error:", err);
            return res.status(500).send("Error fetching notices.");
        }

        // 👉 Format date before passing to template
        const formattedResults = results.map(notice => {
            if (notice.date) {
                const options = { day: '2-digit', month: 'short', year: 'numeric' };
                notice.date = new Date(notice.date).toLocaleDateString('en-GB', options);
            }
            return notice;
        });

        res.render("viewnotice", { notices: formattedResults }); 
    });
};


exports.getNoticeById = (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM notices WHERE id = ?";
    db.query(sql, [id], (err, results) => {
        if (err || results.length === 0) {
            console.error("Notice fetch error:", err);
            return res.status(404).send("Notice not found.");
        }

        const notice = results[0];
        const filePath = `/uploads/notices/${notice.filename}`;

        // add toolbar=0 to hide controls
        const fileUrl = `${filePath}#toolbar=0&navpanes=0&scrollbar=0`;

        res.render("singlenotice", { notice, fileUrl });
    });
};


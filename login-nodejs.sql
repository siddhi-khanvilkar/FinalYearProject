-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 12, 2025 at 05:22 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `login-nodejs`
--

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `id` int(11) NOT NULL,
  `control_id` varchar(50) NOT NULL,
  `student_name` varchar(100) NOT NULL,
  `class` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`id`, `control_id`, `student_name`, `class`) VALUES
(1, 'A020', 'NEERAJ', 'TYIT'),
(2, 'A024', 'SIDDHI', 'TYIT'),
(3, 'A032', 'DEVIKA', 'TYIT'),
(4, 'A050', 'DISHA', 'TYIT'),
(5, 'A007', 'PRANITHA', 'TYIT'),
(6, 'A027', 'SAMRUDDHA', 'TYIT'),
(7, 'A056', 'RAHUL', 'TYIT');

-- --------------------------------------------------------

--
-- Table structure for table `teacher`
--

CREATE TABLE `teacher` (
  `teacherid` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `teacher`
--

INSERT INTO `teacher` (`teacherid`, `username`, `password`) VALUES
(1, 'teacher', '12345');

-- --------------------------------------------------------

--
-- Table structure for table `username`
--

CREATE TABLE `username` (
  `username` varchar(12) NOT NULL,
  `controlid` int(7) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `username`
--

INSERT INTO `username` (`username`, `controlid`, `password`) VALUES
('siddhi', 84200, '$2b$08$vI/rAWf4lnV5SBLTxDGnMuf7rQzzPPUzqNYSGsLIZdX2lmSzVbXpW'),
('disha', 5000, '$2b$08$ccSpXR1DTPk6Y8A8fCJPd.csM2N.5/WrNis0ohywYHNbmqL56xSeK'),
('devika', 1222005, '$2b$08$q6LMFDwrVzPjHup2UellqutvBEf5SBwChjPfZlatVynLv7C7nliJi'),
('pranitha', 313131, '$2b$08$k0rdksMgzMLrI2c3G2xU9uL5JqDZY8ZPJwzS1zFmBM5oa8HaFhDaa'),
('adi', 5555, '$2b$08$Dcc0lJQbI064W90ByPUpteBWbZrCNQ2kItZoFW6lLxfatzsanyeT6'),
('rahul', 6034, '$2b$08$jLiyXhVfccn8cZurAKIzKei.BLyuq8MwhfoCOCBu72.PCbPZB7cKC'),
('prachitee', 5252, '$2b$08$GBr6FfHEWfPg3g0HtpgvpeOX0pUlMGR.nSqZD0J2ymrIF05m61v.6'),
('samruddha', 63214, '$2b$08$wcvz2fx.wiy96S/WrwOLyuFB2ZPYGunjqPCOMlsTgZN1W4pVsJ5zi');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `control_id` (`control_id`);

--
-- Indexes for table `teacher`
--
ALTER TABLE `teacher`
  ADD PRIMARY KEY (`teacherid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `teacher`
--
ALTER TABLE `teacher`
  MODIFY `teacherid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

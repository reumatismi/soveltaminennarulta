-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: mysql.metropolia.fi
-- Generation Time: May 07, 2021 at 11:05 AM
-- Server version: 10.1.48-MariaDB
-- PHP Version: 7.4.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mattist`
--

-- --------------------------------------------------------

--
-- Table structure for table `proj_class`
--

CREATE TABLE `proj_class` (
  `classid` char(3) NOT NULL,
  `class` char(2) DEFAULT NULL,
  `vst` date NOT NULL,
  `vet` date DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `proj_class`
--

INSERT INTO `proj_class` (`classid`, `class`, `vst`, `vet`) VALUES
('20A', '2A', '2021-05-07', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `proj_comment`
--

CREATE TABLE `proj_comment` (
  `id` int(11) NOT NULL,
  `userid` int(11) DEFAULT NULL,
  `mediaid` int(11) DEFAULT NULL,
  `commenttext` char(100) DEFAULT NULL,
  `visibility` int(11) DEFAULT NULL,
  `vst` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `vet` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `proj_gamedesc`
--

CREATE TABLE `proj_gamedesc` (
  `typeid` int(11) NOT NULL,
  `type` char(50) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `proj_games`
--

CREATE TABLE `proj_games` (
  `gameid` int(11) NOT NULL,
  `gamename` char(50) DEFAULT NULL,
  `gametype` int(11) DEFAULT NULL,
  `vst` date NOT NULL,
  `vet` date DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `proj_gamestats`
--

CREATE TABLE `proj_gamestats` (
  `gameid` int(11) NOT NULL,
  `points` int(11) DEFAULT NULL,
  `playerid` int(11) NOT NULL,
  `vst` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `vet` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `proj_mediafeed`
--

CREATE TABLE `proj_mediafeed` (
  `id` int(11) NOT NULL,
  `classid` char(3) DEFAULT NULL,
  `userid` int(11) DEFAULT NULL,
  `mediafilename` text,
  `mediadesc` char(100) DEFAULT NULL,
  `visibility` int(11) DEFAULT NULL,
  `vst` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `vet` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `proj_role`
--

CREATE TABLE `proj_role` (
  `id` int(11) NOT NULL,
  `description` varchar(20) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `proj_role`
--

INSERT INTO `proj_role` (`id`, `description`) VALUES
(1, 'oppilas'),
(2, 'opettaja'),
(3, 'rehtori'),
(4, 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `proj_user`
--

CREATE TABLE `proj_user` (
  `id` int(11) NOT NULL,
  `username` varchar(15) DEFAULT NULL,
  `firstname` varchar(50) DEFAULT NULL,
  `lastname` varchar(50) DEFAULT NULL,
  `role` int(11) DEFAULT NULL,
  `classid` varchar(3) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `vst` datetime NOT NULL,
  `vet` datetime DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `proj_user`
--

INSERT INTO `proj_user` (`id`, `username`, `firstname`, `lastname`, `role`, `classid`, `password`, `vst`, `vet`) VALUES
(1, 'malliopettaja', 'Sirpa', 'Lehtinen', 2, '20A', '1234', '2021-05-07 11:03:14', NULL),
(2, 'mallioppilas', 'Albert', 'Järvinen', 1, '20A', '1234', '2021-05-07 11:03:14', NULL),
(3, 'naurulokki', 'Jukka', 'Tolonen', 1, '20A', 'oppilas1234', '2021-05-07 11:03:14', NULL),
(4, 'mira101', 'Mira', 'Sääksi', 1, '20A', 'oppilas1234', '2021-05-07 11:03:14', NULL),
(5, 'tartsan', 'Heini', 'Vennamo', 1, '20A', 'oppilas1234', '2021-05-07 11:03:14', NULL),
(6, 'homunculus', 'Pekka', 'Pohjola', 1, '20A', 'oppilas1234', '2021-05-07 11:03:14', NULL),
(7, 'sorjonen', 'Karim', 'Sorjonen', 1, '20A', 'oppilas1234', '2021-05-07 11:03:14', NULL),
(8, 'erikoisukko', 'Matti', 'Vanhanen', 1, '20A', 'oppilas1234', '2021-05-07 11:03:14', NULL),
(9, 'pan_pan', 'Kia', 'Lungström', 1, '20A', 'oppilas1234', '2021-05-07 11:03:14', NULL),
(10, 'rebel_maysala', 'Janne', 'Mäysälä', 1, '20A', 'oppilas1234', '2021-05-07 11:03:14', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `proj_class`
--
ALTER TABLE `proj_class`
  ADD PRIMARY KEY (`classid`,`vst`),
  ADD UNIQUE KEY `classid` (`classid`);

--
-- Indexes for table `proj_comment`
--
ALTER TABLE `proj_comment`
  ADD PRIMARY KEY (`id`,`vst`);

--
-- Indexes for table `proj_gamedesc`
--
ALTER TABLE `proj_gamedesc`
  ADD PRIMARY KEY (`typeid`);

--
-- Indexes for table `proj_games`
--
ALTER TABLE `proj_games`
  ADD PRIMARY KEY (`gameid`,`vst`);

--
-- Indexes for table `proj_gamestats`
--
ALTER TABLE `proj_gamestats`
  ADD PRIMARY KEY (`gameid`,`playerid`,`vst`);

--
-- Indexes for table `proj_mediafeed`
--
ALTER TABLE `proj_mediafeed`
  ADD PRIMARY KEY (`id`,`vst`);

--
-- Indexes for table `proj_role`
--
ALTER TABLE `proj_role`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `proj_user`
--
ALTER TABLE `proj_user`
  ADD PRIMARY KEY (`id`,`vst`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `proj_comment`
--
ALTER TABLE `proj_comment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `proj_gamedesc`
--
ALTER TABLE `proj_gamedesc`
  MODIFY `typeid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `proj_games`
--
ALTER TABLE `proj_games`
  MODIFY `gameid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `proj_mediafeed`
--
ALTER TABLE `proj_mediafeed`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `proj_user`
--
ALTER TABLE `proj_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

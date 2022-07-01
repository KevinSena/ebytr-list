DROP DATABASE IF EXISTS `list`;
CREATE DATABASE `list`;
USE `list`;

CREATE TABLE `users` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `nickname` VARCHAR(100) NOT NULL UNIQUE,
  `username` VARCHAR(255) NOT NULL,
  `password` TEXT NOT NULL
);

CREATE TABLE `dayTasks` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `userId` INT,
  `day` TIMESTAMP NOT NULL,
  `task` TEXT NOT NULL,
  `description` TEXT NOT NULL,
  `feeling` TEXT NOT NULL,
  `importance` VARCHAR(50) NOT NULL,
  FOREIGN KEY (userId) REFERENCES list.users (id)
);

INSERT INTO `users` (`nickname`, `username`, `password`) VALUES
  ('kevin', 'Kevin de Souza Sena', '12345678');
  
INSERT INTO `dayTasks` (`userId`, `day`, `task`, `description`, `feeling`, `importance`) VALUES
  (1, CURRENT_TIMESTAMP(), 'Wake Up', 'Wake up at 8 hour', 'Not Good', 'urgent');
DROP DATABASE IF EXISTS `list`;
CREATE DATABASE `list`;
USE `list`;

CREATE TABLE `users` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `nickname` VARCHAR(100) NOT NULL UNIQUE,
  `username` VARCHAR(255) NOT NULL,
  `password` TEXT NOT NULL
);

CREATE TABLE `priorities` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `priority` VARCHAR(50) NOT NULL
);

CREATE TABLE `dayTasks` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `userId` INT,
  `day` DATETIME NOT NULL,
  `task` TEXT NOT NULL,
  `description` TEXT NOT NULL,
  `feeling` TEXT NOT NULL,
  `priorityId` INT,
  FOREIGN KEY (userId) REFERENCES list.users (id),
  FOREIGN KEY (priorityId) REFERENCES list.priorities (id)
);

INSERT INTO `users` (`nickname`, `username`, `password`) VALUES
  ('kevin', 'Kevin de Souza Sena', '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO'); -- secret_user

INSERT INTO `priorities` (`priority`) VALUES
  ('Pendente'),
  ('Em andamento'),
  ('Pronto');

INSERT INTO `dayTasks` (`userId`, `day`, `task`, `description`, `feeling`, `priorityId`) VALUES
  (1, NOW(), 'Academia', 'Ir a academia no centro', '', 3),
  (1, NOW(), 'Reunião', 'Reunão do squad pelo zoom', 'Estou ancioso', 2),
  (1, NOW(), 'Devocional', 'Ler Mateus para todos cap. 14', 'Not Good', 1),
  (1, NOW(), 'Visita', 'Visitar amigo que está doente', 'Not Good', 1);
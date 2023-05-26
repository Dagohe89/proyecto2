-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema faf
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `faf` ;

-- -----------------------------------------------------
-- Schema faf
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `faf` DEFAULT CHARACTER SET utf8 ;
USE `faf` ;

-- -----------------------------------------------------
-- Table `faf`.`equipo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `faf`.`equipo` (
  `idequipo` INT(11) NOT NULL AUTO_INCREMENT,
  `nombreEquipo` VARCHAR(255) NOT NULL,
  `colorCamiseta` VARCHAR(255) NOT NULL,
  `colorCamiseta2` VARCHAR(255) NOT NULL,
  `direciónCampo` VARCHAR(255) NOT NULL,
  `fotoescudourl` VARCHAR(255) NOT NULL,
  `ganados` INT(2) NOT NULL,
  `empatados` INT(2) NOT NULL,
  `perdidos` INT(2) NOT NULL,
  `golesFavor` INT(2) NOT NULL,
  `golesContra` INT(2) NOT NULL,
  PRIMARY KEY (`idequipo`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `faf`.`delegado`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `faf`.`delegado` (
  `iddelegado` INT(11) NOT NULL AUTO_INCREMENT,
  `Nombre` VARCHAR(255) NOT NULL,
  `Apellido1` VARCHAR(255) NOT NULL,
  `Apellido2` VARCHAR(255) NOT NULL,
  `dni` VARCHAR(255) NOT NULL,
  `nickname` VARCHAR(255) NOT NULL,
  `contraseña` VARCHAR(255) NOT NULL,
  `fotodelegadourl` VARCHAR(255) NOT NULL,
  `equipo_idequipo` INT(11) NOT NULL,
  PRIMARY KEY (`iddelegado`),
  CONSTRAINT `fk_delegado_equipo1`
    FOREIGN KEY (`equipo_idequipo`)
    REFERENCES `faf`.`equipo` (`idequipo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `faf`.`jugador`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `faf`.`jugador` (
  `idjugador` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(255) NOT NULL,
  `apellido1` VARCHAR(255) NOT NULL,
  `apellido2` VARCHAR(255) NOT NULL,
  `DNI` CHAR(9) NOT NULL,
  `fechaNacimiento` DATE NOT NULL,
  `dorsal` INT(2) NOT NULL,
  `fotojugadorurl` VARCHAR(255) NOT NULL,
  `equipo_idequipo` INT(11) NOT NULL,
  `ta` INT(2) NOT NULL,
  `tr` INT(2) NOT NULL,
  `goles` INT(3) NOT NULL,
  `asistencias` INT(3) NOT NULL,
  PRIMARY KEY (`idjugador`),
  CONSTRAINT `fk_jugador_Equipo1`
    FOREIGN KEY (`equipo_idequipo`)
    REFERENCES `faf`.`equipo` (`idequipo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

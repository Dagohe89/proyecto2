-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema FAF
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `FAF` ;

-- -----------------------------------------------------
-- Schema FAF
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `FAF` DEFAULT CHARACTER SET utf8 ;
USE `FAF` ;

-- -----------------------------------------------------
-- Table `FAF`.`Delegado`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `FAF`.`Delegado` (
  `iddelegado` INT NOT NULL AUTO_INCREMENT,
  `Nombre` VARCHAR(255) NOT NULL,
  `Apellido1` VARCHAR(255) NOT NULL,
  `Apellido2` VARCHAR(255) NOT NULL,
  `dni` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`iddelegado`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `FAF`.`Equipo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `FAF`.`Equipo` (
  `idequipo` INT NOT NULL AUTO_INCREMENT,
  `nombreEquipo` VARCHAR(255) NOT NULL,
  `direciónCampo` VARCHAR(255) NOT NULL,
  `colorCamiseta` VARCHAR(255) NOT NULL,
  `delegado` VARCHAR(255) NOT NULL,
  `clave` VARCHAR(45) NOT NULL,
  `ganados` INT(2) NOT NULL,
  `empatados` INT(2) NOT NULL,
  `perdidos` INT(2) NOT NULL,
  `golesFavor` INT(2) NOT NULL,
  `golesContra` INT(2) NOT NULL,
  `Delegado_iddelegado` INT NOT NULL,
  PRIMARY KEY (`idequipo`),
  CONSTRAINT `fk_Equipo_Delegado1`
    FOREIGN KEY (`Delegado_iddelegado`)
    REFERENCES `FAF`.`Delegado` (`iddelegado`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `FAF`.`jugador`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `FAF`.`jugador` (
  `idjugador` INT NOT NULL AUTO_INCREMENT,
  `nombreCompleto` VARCHAR(255) NOT NULL,
  `DNI` CHAR(9) NOT NULL,
  `numero` INT(2) NOT NULL,
  `fechaNacimiendo` DATETIME NOT NULL,
  `Equipo_idequipo` INT NOT NULL,
  PRIMARY KEY (`idjugador`),
  CONSTRAINT `fk_jugador_Equipo1`
    FOREIGN KEY (`Equipo_idequipo`)
    REFERENCES `FAF`.`Equipo` (`idequipo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

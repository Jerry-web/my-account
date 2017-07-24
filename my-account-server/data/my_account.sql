/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50543
Source Host           : 127.0.0.1:3306
Source Database       : my_account

Target Server Type    : MYSQL
Target Server Version : 50543
File Encoding         : 65001

Date: 2017-07-24 15:21:23
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for account
-- ----------------------------
DROP TABLE IF EXISTS `account`;
CREATE TABLE `account` (
  `account_id` int(11) NOT NULL AUTO_INCREMENT,
  `account_date` datetime DEFAULT NULL,
  `account_sum` double DEFAULT NULL,
  `account_flow` char(2) DEFAULT NULL COMMENT '0：支出  1：收入',
  `type_id` int(11) DEFAULT NULL,
  `member_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `account_remark` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`account_id`)
) ENGINE=InnoDB AUTO_INCREMENT=109 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of account
-- ----------------------------
INSERT INTO `account` VALUES ('36', '2017-07-05 00:00:00', '100', '0', '3', null, '1', null);
INSERT INTO `account` VALUES ('37', '2017-07-11 00:00:00', '2300', '0', '1', '1', '1', null);
INSERT INTO `account` VALUES ('38', '2017-08-17 00:00:00', '6800', '0', '3', '1', '1', null);
INSERT INTO `account` VALUES ('39', '2017-09-13 00:00:00', '8000', '0', '2', '1', '1', null);
INSERT INTO `account` VALUES ('40', '2017-10-16 00:00:00', '7800', '0', '5', '1', '1', null);
INSERT INTO `account` VALUES ('41', '2017-11-08 00:00:00', '4500', '0', '1', '1', '1', null);
INSERT INTO `account` VALUES ('43', '2017-12-21 00:00:00', '5900', '0', '2', '2', '1', null);
INSERT INTO `account` VALUES ('44', '2017-06-23 00:00:00', '450', '0', '2', '1', '1', null);
INSERT INTO `account` VALUES ('45', '2017-06-24 00:00:00', '100', '0', '3', '1', '1', null);
INSERT INTO `account` VALUES ('46', '2017-06-25 00:00:00', '340', '0', '5', '1', '1', null);
INSERT INTO `account` VALUES ('47', '2017-06-26 00:00:00', '560', '0', '2', '3', '1', null);
INSERT INTO `account` VALUES ('53', '2017-06-16 00:00:00', '560', '0', '6', '1', '1', null);
INSERT INTO `account` VALUES ('54', '2017-06-14 00:00:00', '580', '1', '6', '1', '1', null);
INSERT INTO `account` VALUES ('55', '2017-06-01 00:00:00', '800', '1', '8', '1', '1', null);
INSERT INTO `account` VALUES ('56', '2017-06-16 00:00:00', '1000', '1', '9', '1', '1', null);
INSERT INTO `account` VALUES ('57', '2017-06-16 00:00:00', '600', '1', '10', '1', '1', null);
INSERT INTO `account` VALUES ('58', '2017-02-02 00:00:00', '40000', '1', '8', '1', '1', null);
INSERT INTO `account` VALUES ('59', '2017-06-11 00:00:00', '600', '1', '8', '1', '1', null);
INSERT INTO `account` VALUES ('60', '2017-06-05 00:00:00', '300', '1', '9', '2', '1', null);
INSERT INTO `account` VALUES ('62', '2017-06-16 00:00:00', '40', '0', '2', '1', '1', null);
INSERT INTO `account` VALUES ('64', '2017-06-16 00:00:00', '30', '0', '2', '1', '1', null);
INSERT INTO `account` VALUES ('65', '2017-06-16 00:00:00', '300', '1', '8', '1', '1', null);
INSERT INTO `account` VALUES ('66', '2017-06-13 00:00:00', '300', '1', '8', '1', '1', null);
INSERT INTO `account` VALUES ('67', '2017-06-20 00:00:00', '560', '0', '2', '2', '1', null);
INSERT INTO `account` VALUES ('68', '2017-05-10 00:00:00', '234', '0', '3', '3', '1', null);
INSERT INTO `account` VALUES ('69', '2017-06-17 00:00:00', '900', '1', '8', '1', '1', null);
INSERT INTO `account` VALUES ('70', '2017-06-17 00:00:00', '900', '1', '8', '1', '1', null);
INSERT INTO `account` VALUES ('71', '2017-06-17 00:00:00', '1000', '1', '6', '1', '1', null);
INSERT INTO `account` VALUES ('72', '2017-06-18 00:00:00', '3000', '1', '6', '1', '1', null);
INSERT INTO `account` VALUES ('73', '2017-06-18 00:00:00', '800', '1', '6', '2', '1', null);
INSERT INTO `account` VALUES ('82', '2017-06-17 00:00:00', '70', '1', '6', null, '1', null);
INSERT INTO `account` VALUES ('83', '2017-06-17 00:00:00', '34', '1', '6', null, '1', null);
INSERT INTO `account` VALUES ('85', '2017-06-29 00:00:00', '600', '0', '24', '18', '2', null);
INSERT INTO `account` VALUES ('86', '2017-06-29 00:00:00', '100', '0', '25', '18', '2', null);
INSERT INTO `account` VALUES ('87', '2017-06-29 00:00:00', '8000', '1', '26', '18', '2', null);
INSERT INTO `account` VALUES ('88', '2017-06-29 00:00:00', '4000', '1', '8', '1', '1', null);
INSERT INTO `account` VALUES ('91', '2017-07-03 00:00:00', '600', '0', '2', '1', '1', null);
INSERT INTO `account` VALUES ('97', '2017-07-04 00:00:00', '500', '1', '8', '1', '1', '今日工资');
INSERT INTO `account` VALUES ('98', '2017-07-10 00:00:00', '89', '0', '3', '1', '1', '');
INSERT INTO `account` VALUES ('99', '2017-07-02 00:00:00', '600', '0', '2', '4', '1', '');
INSERT INTO `account` VALUES ('100', '2017-07-05 00:00:00', '800', '0', '3', '1', '1', null);
INSERT INTO `account` VALUES ('101', '2017-07-03 00:00:00', '30', '1', '10', null, '1', null);
INSERT INTO `account` VALUES ('102', '2017-07-04 00:00:00', '900', '1', '8', null, '1', null);
INSERT INTO `account` VALUES ('103', '2017-07-05 00:00:00', '200', '1', '9', null, '1', null);
INSERT INTO `account` VALUES ('104', '2017-07-10 00:00:00', '600', '0', '1', null, '1', '');
INSERT INTO `account` VALUES ('105', '2017-07-11 00:00:00', '50', '0', '5', null, '1', '');
INSERT INTO `account` VALUES ('106', '2017-07-05 00:00:00', '600', '0', '5', null, '1', '');
INSERT INTO `account` VALUES ('107', '2017-07-05 00:00:00', '100', '0', '3', null, '1', '');
INSERT INTO `account` VALUES ('108', '2017-07-12 00:00:00', '35', '1', '9', null, '1', null);

-- ----------------------------
-- Table structure for account_member
-- ----------------------------
DROP TABLE IF EXISTS `account_member`;
CREATE TABLE `account_member` (
  `member_id` int(11) NOT NULL AUTO_INCREMENT,
  `member_name` varchar(255) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`member_id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of account_member
-- ----------------------------
INSERT INTO `account_member` VALUES ('1', '本人', '1');
INSERT INTO `account_member` VALUES ('4', '父母', '1');
INSERT INTO `account_member` VALUES ('16', '老婆', '1');
INSERT INTO `account_member` VALUES ('17', '孩子', '1');
INSERT INTO `account_member` VALUES ('18', '本人', '2');

-- ----------------------------
-- Table structure for account_type
-- ----------------------------
DROP TABLE IF EXISTS `account_type`;
CREATE TABLE `account_type` (
  `type_id` int(11) NOT NULL AUTO_INCREMENT,
  `type_name` varchar(255) DEFAULT NULL,
  `type_parent` int(11) DEFAULT NULL,
  `type_flow` char(2) DEFAULT NULL COMMENT '0：支出，1：收入',
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of account_type
-- ----------------------------
INSERT INTO `account_type` VALUES ('1', '生活用品', null, '0', '1');
INSERT INTO `account_type` VALUES ('2', '购物', null, '0', '1');
INSERT INTO `account_type` VALUES ('3', '话费', null, '0', '1');
INSERT INTO `account_type` VALUES ('4', '医疗', null, '0', '1');
INSERT INTO `account_type` VALUES ('5', '伙食', null, '0', '1');
INSERT INTO `account_type` VALUES ('6', '生活费', null, '1', '1');
INSERT INTO `account_type` VALUES ('7', '其他', null, '0', '1');
INSERT INTO `account_type` VALUES ('8', '工资', null, '1', '1');
INSERT INTO `account_type` VALUES ('9', '理财', null, '1', '1');
INSERT INTO `account_type` VALUES ('10', '投资', null, '1', '1');
INSERT INTO `account_type` VALUES ('23', '测试', null, '0', '1');
INSERT INTO `account_type` VALUES ('24', '购物', null, '0', '2');
INSERT INTO `account_type` VALUES ('25', '伙食费', null, '0', '2');
INSERT INTO `account_type` VALUES ('26', '工资', null, '1', '2');
INSERT INTO `account_type` VALUES ('27', '理财', null, '1', '2');

-- ----------------------------
-- Table structure for account_user
-- ----------------------------
DROP TABLE IF EXISTS `account_user`;
CREATE TABLE `account_user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(255) DEFAULT NULL,
  `user_age` varchar(255) DEFAULT NULL,
  `user_phone` varchar(255) DEFAULT NULL,
  `user_email` varchar(255) DEFAULT NULL,
  `user_password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of account_user
-- ----------------------------
INSERT INTO `account_user` VALUES ('1', 'admin', '18', '13566782489', 'test@163.com', '123');

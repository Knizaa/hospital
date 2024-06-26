"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validator = require("validator");
const context_items_1 = require("../context-items");
class ValidatorsImpl {
    constructor(builder, chain) {
        this.builder = builder;
        this.chain = chain;
        this.negateNext = false;
    }
    addItem(item) {
        this.builder.addItem(item);
        this.lastValidator = item;
        // Reset this.negateNext so that next validation isn't negated too
        this.negateNext = false;
        return this.chain;
    }
    // validation manipulation
    not() {
        this.negateNext = true;
        return this.chain;
    }
    withMessage(message) {
        this.lastValidator.message = message;
        return this.chain;
    }
    // custom validators
    custom(validator) {
        return this.addItem(new context_items_1.CustomValidation(validator, this.negateNext));
    }
    exists(options = {}) {
        let validator;
        if (options.checkFalsy) {
            validator = value => !!value;
        }
        else if (options.checkNull) {
            validator = value => value != null;
        }
        else {
            validator = value => value !== undefined;
        }
        return this.custom(validator);
    }
    isArray(options = {}) {
        return this.custom(value => Array.isArray(value) &&
            (typeof options.min === 'undefined' || value.length >= options.min) &&
            (typeof options.max === 'undefined' || value.length <= options.max));
    }
    isString() {
        return this.custom(value => typeof value === 'string');
    }
    notEmpty(options) {
        this.not();
        return this.isEmpty(options);
    }
    // Standard validators
    addStandardValidation(validator, ...options) {
        return this.addItem(new context_items_1.StandardValidation(validator, this.negateNext, options));
    }
    contains(elem) {
        return this.addStandardValidation(validator.contains, elem);
    }
    equals(comparison) {
        return this.addStandardValidation(validator.equals, comparison);
    }
    isAfter(date) {
        return this.addStandardValidation(validator.isAfter, date);
    }
    isAlpha(locale) {
        return this.addStandardValidation(validator.isAlpha, locale);
    }
    isAlphanumeric(locale) {
        return this.addStandardValidation(validator.isAlphanumeric, locale);
    }
    isAscii() {
        return this.addStandardValidation(validator.isAscii);
    }
    isBase32() {
        return this.addStandardValidation(validator.isBase32);
    }
    isBase64() {
        return this.addStandardValidation(validator.isBase64);
    }
    isBefore(date) {
        return this.addStandardValidation(validator.isBefore, date);
    }
    isBIC() {
        return this.addStandardValidation(validator.isBIC);
    }
    isBoolean() {
        return this.addStandardValidation(validator.isBoolean);
    }
    isByteLength(options) {
        return this.addStandardValidation(validator.isByteLength, options);
    }
    isCreditCard() {
        return this.addStandardValidation(validator.isCreditCard);
    }
    isCurrency(options) {
        return this.addStandardValidation(validator.isCurrency, options);
    }
    isDataURI() {
        return this.addStandardValidation(validator.isDataURI);
    }
    isDecimal(options) {
        return this.addStandardValidation(validator.isDecimal, options);
    }
    isDivisibleBy(number) {
        return this.addStandardValidation(validator.isDivisibleBy, number);
    }
    isEmail(options) {
        return this.addStandardValidation(validator.isEmail, options);
    }
    isEmpty(options) {
        return this.addStandardValidation(validator.isEmpty, options);
    }
    isFQDN(options) {
        return this.addStandardValidation(validator.isFQDN, options);
    }
    isFloat(options) {
        return this.addStandardValidation(validator.isFloat, options);
    }
    isFullWidth() {
        return this.addStandardValidation(validator.isFullWidth);
    }
    isHalfWidth() {
        return this.addStandardValidation(validator.isHalfWidth);
    }
    isHash(algorithm) {
        return this.addStandardValidation(validator.isHash, algorithm);
    }
    isHexColor() {
        return this.addStandardValidation(validator.isHexColor);
    }
    isHexadecimal() {
        return this.addStandardValidation(validator.isHexadecimal);
    }
    isIdentityCard(locale) {
        return this.addStandardValidation(validator.isIdentityCard, locale);
    }
    isIP(version) {
        return this.addStandardValidation(validator.isIP, version);
    }
    isIPRange() {
        return this.addStandardValidation(validator.isIPRange);
    }
    isISBN(version) {
        return this.addStandardValidation(validator.isISBN, version);
    }
    isISSN(options) {
        return this.addStandardValidation(validator.isISSN, options);
    }
    isISIN() {
        return this.addStandardValidation(validator.isISIN);
    }
    isISO8601(options) {
        return this.addStandardValidation(validator.isISO8601, options);
    }
    isISO31661Alpha2() {
        return this.addStandardValidation(validator.isISO31661Alpha2);
    }
    isISO31661Alpha3() {
        return this.addStandardValidation(validator.isISO31661Alpha3);
    }
    isISRC() {
        return this.addStandardValidation(validator.isISRC);
    }
    isIn(values) {
        return this.addStandardValidation(validator.isIn, values);
    }
    isInt(options) {
        return this.addStandardValidation(validator.isInt, options);
    }
    isJSON() {
        return this.addStandardValidation(validator.isJSON);
    }
    isJWT() {
        return this.addStandardValidation(validator.isJWT);
    }
    isLatLong() {
        return this.addStandardValidation(validator.isLatLong);
    }
    isLength(options) {
        return this.addStandardValidation(validator.isLength, options);
    }
    isLowercase() {
        return this.addStandardValidation(validator.isLowercase);
    }
    isMagnetURI() {
        return this.addStandardValidation(validator.isMagnetURI);
    }
    isMACAddress(options) {
        return this.addStandardValidation(validator.isMACAddress, options);
    }
    isMD5() {
        return this.addStandardValidation(validator.isMD5);
    }
    isMimeType() {
        return this.addStandardValidation(validator.isMimeType);
    }
    isMobilePhone(locale, options) {
        return this.addStandardValidation(validator.isMobilePhone, locale, options);
    }
    isMongoId() {
        return this.addStandardValidation(validator.isMongoId);
    }
    isMultibyte() {
        return this.addStandardValidation(validator.isMultibyte);
    }
    isNumeric(options) {
        return this.addStandardValidation(validator.isNumeric, options);
    }
    isOctal() {
        return this.addStandardValidation(validator.isOctal);
    }
    isPort() {
        return this.addStandardValidation(validator.isPort);
    }
    isPostalCode(locale) {
        return this.addStandardValidation(validator.isPostalCode, locale);
    }
    isRFC3339() {
        return this.addStandardValidation(validator.isRFC3339);
    }
    isSlug() {
        return this.addStandardValidation(validator.isSlug);
    }
    isSurrogatePair() {
        return this.addStandardValidation(validator.isSurrogatePair);
    }
    isURL(options) {
        return this.addStandardValidation(validator.isURL, options);
    }
    isUUID(version) {
        return this.addStandardValidation(validator.isUUID, version);
    }
    isUppercase() {
        return this.addStandardValidation(validator.isUppercase);
    }
    isVariableWidth() {
        return this.addStandardValidation(validator.isVariableWidth);
    }
    isWhitelisted(chars) {
        return this.addStandardValidation(validator.isWhitelisted, chars);
    }
    matches(pattern, modifiers) {
        return this.addStandardValidation(validator.matches, pattern, modifiers);
    }
}
exports.ValidatorsImpl = ValidatorsImpl;

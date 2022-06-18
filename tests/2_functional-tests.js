const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');
const translator = new Translator();

suite('Functional Tests', () => {
    test("Translation with text and locale fields: POST request to \"/api/translate\"", (done) => {
        chai.request(server)
            .post("/api/translate")
            .type("form")
            .send({
                text: "Acetaminophen",
                locale: "american-to-british"
            })
            .end((err, data) => {
                const response = data.body;
                assert.equal(err, null);
                assert.equal(response.translation, "<span class=\"highlight\">Paracetamol</span>")
                done();
            })
    })
    test("Translation with text and invalid locale field: POST request to \"/api/translate\"", (done) => {
        chai.request(server)
            .post("/api/translate")
            .type("form")
            .send({
                text: "Acetaminophen",
                locale: "american-to-britishx"
            })
            .end((err, data) => {
                const response = data.body;
                assert.equal(err, null);
                assert.equal(response.error, "Invalid value for locale field")
                done();
            })
    })
    test("Translation with missing text field: POST request to \"/api/translate\"", (done) => {
        chai.request(server)
            .post("/api/translate")
            .type("form")
            .send({
                locale: "american-to-british"
            })
            .end((err, data) => {
                const response = data.body;
                assert.equal(err, null);
                assert.equal(response.error, "Required field(s) missing")
                done();
            })
    })
    test("Translation with missing locale field: POST request to \"/api/translate\"", (done) => {
        chai.request(server)
            .post("/api/translate")
            .type("form")
            .send({
                text : "Acetaminophen"
            })
            .end((err, data) => {
                const response = data.body;
                assert.equal(err, null);
                assert.equal(response.error, "Required field(s) missing")
                done();
            })
    })
    test("Translation with empty text: POST request to \"/api/translate\"", (done) => {
        chai.request(server)
            .post("/api/translate")
            .type("form")
            .send({
                text : "",
                locale : "american-to-british"
            })
            .end((err, data) => {
                const response = data.body;
                assert.equal(err, null);
                assert.equal(response.error, "No text to translate")
                done();
            })
    })
    test("Translation with text that needs no translation: POST request to \"/api/translate\"", (done) => {
        chai.request(server)
            .post("/api/translate")
            .type("form")
            .send({
                text : "favourite",
                locale : "american-to-british"
            })
            .end((err, data) => {
                const response = data.body;
                assert.equal(err, null);
                assert.equal(response.translation, "Everything looks good to me!")
                done();
            })
    })
});

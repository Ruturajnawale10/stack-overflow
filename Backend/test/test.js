import { equal } from "assert";
import chai from "chai";
import { expect } from "chai";
import { should } from "chai";
import pkg from "chai-http";
import { assert } from "console";
const chaiHttp = pkg;
import service from "../index.js";

chai.use(chaiHttp);

describe("/check if duplicate tag is not getting added in system by admin", () => {
    it("to get receive duplicate string as response", async () => {
      const res = await chai
        .request(service)
        .post("/admin/tags/add")
        .send({ tagName: "python", tagDescription: "Python is used in ML and even web backend development." })
      equal(res.text, "DUPLICATE");
    });
  });

  describe("/Check if tags are fetched", () => {
    it("to receive tags length greater than 10", (done) => {
      chai
        .request(service)
        .get("/tags/getTags")
        .end((err, res) => {
          equal(res.status, 200);
          expect(JSON.parse(res.text).length).to.be.greaterThan(10);
          done();
        });
    });
  });

  describe("/Check question fetched in dashboard", () => {
    it("to be not under admin review", (done) => {
      chai
        .request(service)
        .get("/question/interesting")
        .end((err, res) => {
          equal(res.status, 200);
          expect(JSON.parse(res.text)[0].isWaitingForReview).to.be.equal(false);
          done();
        });
    });
  });

  describe("/Check question viewCount", () => {
    it("to be greather than 0", (done) => {
      chai
        .request(service)
        .get("/question/viewCount")
        .query({ questionID: "627e99ccde73ba0a584d0acf" })
        .end((err, res) => {
          equal(res.status, 200);
          expect(JSON.parse(res.text)).to.be.greaterThan(0);
          done();
        });
    });
  });

  describe("/Check get questions by a sample tag ", () => {
    it("to be greater than or equal to 2", (done) => {
      chai
        .request(service)
        .get("/question/getQuestionByTag")
        .query({ tag: "python" })
        .end((err, res) => {
          equal(res.status, 200);
          expect(JSON.parse(res.text).length).to.be.greaterThanOrEqual(2);
          done();
        });
    });
  });

  describe("/Check question fetched in dashboard's hot section", () => {
    it("to be not under admin review", (done) => {
      chai
        .request(service)
        .get("/question/hot")
        .end((err, res) => {
          equal(res.status, 200);
          expect(JSON.parse(res.text)[0].isWaitingForReview).to.be.equal(false);
          done();
        });
    });
  });

  describe("/Check question fetched in dashboard's score section", () => {
    it("to be not under admin review", (done) => {
      chai
        .request(service)
        .get("/question/score")
        .end((err, res) => {
          equal(res.status, 200);
          expect(JSON.parse(res.text)[0].isWaitingForReview).to.be.equal(false);
          done();
        });
    });
  });

  describe("/Check question fetched in dashboard's unanswered section", () => {
    it("to not have any answers", (done) => {
      chai
        .request(service)
        .get("/question/unanswered")
        .end((err, res) => {
          equal(res.status, 200);
          expect(JSON.parse(res.text)[0].answers.length).to.be.equal(0);
          done();
        });
    });
  });


  describe("/Check user profile", () => {
    it("to be fetched", (done) => {
      chai
        .request(service)
        .get("/user/profile")
        .query({ userID: "627aac961b25f8edaaa5c8de" })
        .end((err, res) => {
          expect(JSON.parse(res.text).aboutMe).to.be.equal("Hola");
          done();
        });
    });
  });

  describe("/ While registering", () => {
    it("check that duplicate email is not registered", async () => {
      const res = await chai
        .request(service)
        .post("/user/register")
        .send({ email: "unregisteredemailid", password: "abcxyz", displayName:"Abc Xyz" })
        equal(res.status, 200);
    });
  });
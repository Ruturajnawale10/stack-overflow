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
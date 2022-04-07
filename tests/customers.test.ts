process.env.NOVE_ENV = 'test';

import Customer from "../src/model/customer";
import fs from "fs";
import path from "path";
import * as http from "http";

import { assert, expect } from "chai";
import request from "supertest";
import server from "../src/server";
import mongoose from "mongoose";

let serverHttp: http.Server | undefined;

before(async ()=>{
  serverHttp = await server;
  await Customer.deleteMany({});
});

describe("Customers", () => {

  describe("Upload file TEXTFILE", () => {
    const filePath = path.join(__dirname, 'TEXTFILE');
    it("POST /customers/upload/textfile", async () => {
      try {
        if (fs.existsSync(filePath)) {
          const res = await request(serverHttp)
            .post("/customers/upload/textfile")
            .attach('textFile',filePath);
          expect(res.status).to.equal(200);
        } else {
          assert.fail("File TEXTFILE does not exists")
        }
      } catch(e) {
        assert.fail(e);
      }
    });
    it("GET /customers", async () => {
      const res = await request(serverHttp).get("/customers");
      expect(res.status).to.equal(200);
    });
  });

  describe("Operations customers API", () => {

    let id: string;

    it("POST /customers", async () => {
      const res = await request(serverHttp)
        .post("/customers")
        .send({
          //typeSubscription:1,
          subscription: "86590847134",
          name: "Vivaldo Mendonça Pinto"
        });
      expect(res.status).to.equal(200);
      id = res.body
    });

    it("GET /customers/:id", async () => {
      const res = await request(serverHttp).get(`/customers/${id}`);
      expect(res.status).to.equal(200);
    });

    it("PUT /customers/:id", async () => {
      const res = await request(serverHttp)
        .put(`/customers/${id}`)
        .send({
          name: "Fulano de Tal",
          subscription: "12345678901",
          email: "fulanodetal@fulanoxpto.com.br",
          phone: "6140040000",
          company: "",
          postalCode: "92354251",
          address: "QR 125 Conjunto 7 Casa 100",
          addressNumber: "SN",
          addressDistrict: "Samambaia Leste",
          city: "Samambaia",
          country: "DF",
          birthDate: "20011960",
          noteAbout: "",
          userId: "1"
          //typeSubscription: 1,
        });
      expect(res.status).to.equal(200);
    });

    it("PATCH /customers/:id", async () => {
      const res = await request(serverHttp)
        .patch(`/customers/${id}`)
        .send({
          email: "fulanodetal_patched@fulanoxpto.com.br"
        });
      expect(res.status).to.equal(200);
    });

    it("DELETE /customer/:id", async () => {
      const res = await request(serverHttp).delete(`/customers/${id}`);
      expect(res.status).to.equal(200);
    });

  });

  

});

after(async ()=>{
  await Customer.deleteMany({});
  serverHttp?.close();
  mongoose.connection.close();
})



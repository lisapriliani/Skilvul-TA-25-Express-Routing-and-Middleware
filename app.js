const express = require("express");
const app = express();
const port = 3003;

const hewan = [
  { id: 1, nama: "Snowy", spesies: "kucing" },
  { id: 2, nama: "Blacki", spesies: "anjing" },
  { id: 3, nama: "Molly", spesies: "kucing" },
  { id: 4, nama: "Milo", spesies: "kelinci" },
  { id: 5, nama: "Rere", spesies: "kucing" },
];

//middleware log untuk mengetahui apakah middleware logger berjalan
const middlewareLogger = (req, res, next) => {
  console.log("this is logger");
  next();
};

//middleware untuk mengecek daya yang dikirimkan
const postChecker = (req, res, next) => {
  const body = req.body;
  const spesies = ["kucing", "anjing", "kelinci"];

  spesies.map((species) => {
    if (body["spesies"] == species) {
      next();
    }
  });

  res.status(404).send({ error: "Spesies tidak valid" });
};

app.use(express.json(), middlewareLogger);

app.get("/hewan", (req, res) => {
  res.status(200).send({ message: "success", data: hewan });
});

app.post("/hewan", postChecker, (req, res) => {
  const body = req.body;
  const data = {
    id: body["id"],
    nama: body["nama"],
    spesies: body["spesies"],
  };

  hewan.push(data);

  res.status(201).send({ message: "success", data: data });
});

app.get("/hewan/:id", (req, res) => {
  const idHewan = req.params.id;
  const hewanById = hewan.filter((data) => data.id == idHewan);

  res.status(200).send({ message: "success", data: hewanById });
});

app.put("/hewan/:id", (req, res) => {
  const body = req.body;
  const idHewan = req.params.id;

  const result = hewan.filter((data) => {
    if (data.id == idHewan) {
      data.nama = body["nama"];
      data.spesies = body["spesies"];
    }
  });

  res.status(200).send({ message: "data hewan berhasil diubah !" });
});

app.delete("/hewan/:id", (req, res) => {
  const idHewan = req.params.id;

  const result = hewan.map((value, index) => {
    if (value.id == idHewan) {
      hewan.splice(index, 1);
    }
  });

  res.status(200).send({ message: "hewan berhasil dihapus" });
});

app.listen(port, () => {
  console.log(`This app listening at http://localhost:${port}`);
});

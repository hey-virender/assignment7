import express from "express";


const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

let items = [];
app.get("/", (re, res) => {
  res.render("list", { items: items });
});

app.post("/", (req, res) => {
  const item = req.body.todo;
  items.push({ id: Date.now(), text: item, completed: false })
  res.redirect("/");
});

app.post("/toggle/:id", (req, res) => {
  const id = Number(req.params.id);
  const item = items.find(i => i.id === id);
  if (item) item.completed = !item.completed;
  res.redirect("/");
});

app.post("/delete/:id", (req, res) => {
  const id = Number(req.params.id);
  items = items.filter(i => i.id !== id);
  res.redirect("/");
});

app.get("/edit/:id", (req, res) => {
  const id = Number(req.params.id);
  const item = items.find(i => i.id === id);
  res.render("edit", { item });
});

app.post("/edit/:id", (req, res) => {
  const id = Number(req.params.id);
  const newText = req.body.todo;
  const item = items.find(i => i.id === id);
  if (item) item.text = newText;
  res.redirect("/");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

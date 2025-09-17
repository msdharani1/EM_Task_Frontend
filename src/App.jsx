import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [productList, setProductList] = useState([]);
  useEffect(() => {
    getProduct();
  }, [productList]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState(null);
  const [mode, setMode] = useState(false);
  const [id, setId] = useState("");

  const getProduct = async () => {
    const response = await axios.get("http://localhost:4000/api/product");
    const product = response.data;
    console.log(product);
    setProductList(product);
  };

  const postProduct = async () => {
    if (!title.trim() || amount <= 0) return;
    if (mode) {
      const UpdateProduct = { title, amount };
      await axios.put(`http://localhost:4000/api/product/${id}`, UpdateProduct);
      setTitle("");
      setAmount("");
      setId("");
      setMode(false);
    } else {
      try {
        const newProdcut = { title, amount };
        await axios.post("http://localhost:4000/api/product", newProdcut);
        setTitle("");
        setAmount("");
      } catch (error) {
        console.error(error);
      }
    }
  };

  const EditProduct = async (id, title, amount) => {
    setTitle(title);
    setAmount(amount);
    setId(id);
    setMode(true);
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/product/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-gray-800 h-screen flex items-center justify-center gap-5 flex-col">
      <h1 className="text-center text-yellow-300 text-3xl font-bold">
        CURD Operation Using MERN Stack
      </h1>
      <div>
        <h3 className="text-center text-white text-2xl font-bold">
          Add Product
        </h3>
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-400 rounded text-gray-300 px-3 py-1"
          />
          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border border-gray-400 rounded text-gray-300 px-3 py-1"
          />
          <button
            onClick={postProduct}
            className="bg-green-900 hover:bg-green-800 cursor-pointer px-2 py-1 rounded text-white"
          >
            {mode ? "Update" : "Add"}
          </button>
        </div>
      </div>
      <div>
        <h3 className="text-center mb-2 text-white text-2xl font-bold">
          Product List
        </h3>
        {productList.map((item) => (
          <div
            key={item._id}
            className="bg-gray-900 w-[100%] px-5 flex gap-5 items-center justify-between text-gray-300 mb-1 py-4 rounded-2xl"
          >
            <div>
              <p>{item.title}</p>
              <p>{item.amount}</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => EditProduct(item._id, item.title, item.amount)}
                className="bg-blue-900 hover:bg-blue-800 cursor-pointer px-2 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => deleteProduct(item._id)}
                className="bg-red-900 hover:bg-red-800 cursor-pointer px-2 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

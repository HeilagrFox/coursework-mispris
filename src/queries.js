import axios from "axios";

export async function getClassificationTree(setFetchData) {
  const apiUrl = "http://localhost:5000/classification/tree";
  axios
    .get(apiUrl)
    .then((response) => {
      const fetchData = response.data;
      setFetchData({
        loading: false,
        dataSource: fetchData.data,
        columns: fetchData.columns,
      });
    })
    .catch((error) => {
      console.error("Ошибка при получении данных:", error);
      setFetchData({ loading: true, dataSource: [], columns: [] });
    });
}
export async function getClassification(setFetchData) {
  const apiUrl = "http://localhost:5000/classification";
  axios
    .get(apiUrl)
    .then((response) => {
      const fetchData = response.data;
      setFetchData({
        loading: false,
        dataSource: fetchData.data,
        columns: fetchData.columns,
      });
    })
    .catch((error) => {
      console.error("Ошибка при получении данных:", error);
      setFetchData({ loading: true, dataSource: [], columns: [] });
    });
}

export async function addClassification(classificationData) {
  const apiUrl = "http://localhost:5000/classification";

  try {
    const response = await axios.post(apiUrl, classificationData);
    return response; // Возвращаем данные, если успешный запрос
  } catch (error) {
    console.error("Ошибка при отправке данных:", error);
    return error;
  }
}

export async function deleteClassificationById(classificationId) {
  const apiUrl = "http://localhost:5000/classification/" + classificationId;

  try {
    const response = await axios.delete(apiUrl);
    return response;
  } catch (error) {
    console.error("Ошибка при отправке данных:", error);
    return error;
  }
}

export async function updateClassificationById(
  classificationId,
  classificationData
) {
  const apiUrl = "http://localhost:5000/classification/" + classificationId;
  try {
    const response = await axios.put(apiUrl, classificationData);
    return response;
  } catch (error) {
    console.error("Ошибка при отправке данных:", error);
    return error;
  }
}

export async function getProduct(setFetchData) {
  const apiUrl = "http://localhost:5000/product";
  axios
    .get(apiUrl)
    .then((response) => {
      const fetchData = response.data;
      setFetchData({
        loading: false,
        dataSource: fetchData.data,
        columns: fetchData.columns,
      });
    })
    .catch((error) => {
      console.error("Ошибка при получении данных:", error);
      setFetchData({ loading: true, dataSource: [], columns: [] });
    });
}

export async function addProduct(productData) {
  const apiUrl = "http://localhost:5000/product";
  try {
    const response = await axios.post(apiUrl, productData);
    return response; // Возвращаем данные, если успешный запрос
  } catch (error) {
    console.error("Ошибка при отправке данных:", error);
    return error;
  }
}

export async function deleteProductById(productId) {
  const apiUrl = "http://localhost:5000/product/" + productId;

  try {
    const response = await axios.delete(apiUrl);
    return response;
  } catch (error) {
    console.error("Ошибка при отправке данных:", error);
    return error;
  }
}

export async function updateProductById(productId, productData) {
  const apiUrl = "http://localhost:5000/product/" + productId;
  try {
    const response = await axios.put(apiUrl, productData);
    return response;
  } catch (error) {
    console.error("Ошибка при отправке данных:", error);
    return error;
  }
}

export async function copyProductById(productId, productData) {
  const apiUrl = "http://localhost:5000/product/" + productId;
  try {
    const response = await axios.post(apiUrl, productData);
    return response;
  } catch (error) {
    console.error("Ошибка при отправке данных:", error);
    return error;
  }
}

export async function getSpec(setFetchData) {
  const apiUrl = "http://localhost:5000/spec";
  axios
    .get(apiUrl)
    .then((response) => {
      const fetchData = response.data;
      setFetchData({
        loading: false,
        dataSource: fetchData.data,
        columns: fetchData.columns,
      });
    })
    .catch((error) => {
      console.error("Ошибка при получении данных:", error);
      setFetchData({ loading: true, dataSource: [], columns: [] });
    });
}

export async function getIdProducts(setListIdProduct) {
  const apiUrl = "http://localhost:5000/spec/id_products";
  axios
    .get(apiUrl)
    .then((response) => {
      let fetchData = response.data;
      if (fetchData.data.length !== 0) {
        const formattedData = fetchData.data.map((input_value, index) => {
          return {
            value: input_value.id_product,
            label: input_value.id_product.toString(),
          };
        });
        console.log("fetch", fetchData);
        setListIdProduct({
          loading: false,
          options: formattedData,
        });
      }
    })
    .catch((error) => {
      console.error("Ошибка при получении данных:", error);
      setListIdProduct({ loading: true, options: [] });
    });
}

export async function getSpecIdProducts(setFetchData, productId) {
  const apiUrl = "http://localhost:5000/spec/" + productId;
  axios
    .get(apiUrl)
    .then((response) => {
      const fetchData = response.data;
      setFetchData({
        loading: false,
        dataSource: fetchData.data,
        columns: fetchData.columns,
      });
    })
    .catch((error) => {
      console.error("Ошибка при получении данных:", error);
      setFetchData({ loading: false, dataSource: [], columns: [] });
    });
}
export async function addSpec(specData) {
  const apiUrl = "http://localhost:5000/spec";
  try {
    const response = await axios.post(apiUrl, specData);
    return response; // Возвращаем данные, если успешный запрос
  } catch (error) {
    console.error("Ошибка при отправке данных:", error);
    return error;
  }
}

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

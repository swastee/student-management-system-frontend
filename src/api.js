
const BASE_URL = 'http://localhost:8080';

export const GetAllStudents = async (search = '', page = 1, limit = 5) => {
  const url = `${BASE_URL}/api/students?search=${search}&page=${page}&limit=${limit}`;

  try {
    const options = {
      method: 'GET',
      'Content-Type': 'application/json'
    }
    const result = await fetch(url, options);
    const data = await result.json();
    return data;

  } catch (err) {
    return err;

  }

}

export const CreateStudent = async (stuObj) => {
  const url = `${BASE_URL}/api/students`;

  try {
    const formData = new FormData();

    for (const key in stuObj) {
      formData.append(key, stuObj[key])
    }
    const options = {
      method: 'POST',
      'Content-Type': 'application/json',
      body: formData
    }
    const result = await fetch(url, options);
    const data = await result.json();
    return data;

  } catch (err) {
    return err;

  }

}

export const updateStudentById = async (stuObj, id) => {
  const url = `${BASE_URL}/api/students/${id}`;

  try {
    const formData = new FormData();

    for (const key in stuObj) {
      formData.append(key, stuObj[key])
    }
    const options = {
      method: 'PUT',
      'Content-Type': 'application/json',
      body: formData
    }
    const result = await fetch(url, options);
    const data = await result.json();

    return data;

  } catch (err) {
    return err;

  }

}

export const DeleteStudentById = async (id) => {
  const url = `${BASE_URL}/api/students/${id}`;

  try {
    const options = {
      method: 'DELETE',
      'Content-Type': 'application/json'

    }
    const result = await fetch(url, options);
    const data = await result.json();
    return data;

  } catch (err) {
    return err;

  }

}

export const GetStudentById = async (id) => {
  const url = `${BASE_URL}/api/students/${id}`;

  try {
    const options = {
      method: 'GET',
      'Content-Type': 'application/json'

    }
    const result = await fetch(url, options);
    const data = await result.json();
    return data;

  } catch (err) {
    return err;

  }

}










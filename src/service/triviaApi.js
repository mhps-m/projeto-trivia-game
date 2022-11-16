// Faz a requisição do token usando a api
const fetchToken = async () => {
  const request = await fetch('https://opentdb.com/api_token.php?command=request');
  const { token } = await request.json();
  localStorage.setItem('token', token);
};

// Busca o token no localStorage e o converte a número
const getToken = () => localStorage.getItem('token');

// Faz requisição das perguntas do jogo à api, utilizando o token
const defaultQuantity = 5;
const fetchQuestions = async (amount = defaultQuantity) => {
  const token = getToken();
  const request = await fetch(`https://opentdb.com/api.php?amount=${amount}&token=${token}`);
  const { response_code: responseCode, results } = await request.json();

  if (responseCode === 0) return results;
  return responseCode;
};

const fetchCustomizedQuestions = async (
  amount = defaultQuantity,
  category,
  difficulty,
  type,
) => {
  const token = getToken();
  const URL = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}&token=${token}`;
  console.log(URL);
  const request = await fetch(URL);
  const { response_code: responseCode, results } = await request.json();
  if (responseCode === 0) return results;
  return responseCode;
};

export { fetchToken, getToken, fetchQuestions, fetchCustomizedQuestions };

// Faz a requisição do token usando a api
const fetchToken = async () => {
  const request = await fetch('https://opentdb.com/api_token.php?command=request');
  const { response_code: responseCode, token } = await request.json();
  if (responseCode !== 0) throw new Error('Erro ao requisitar Token');
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
  console.log(results);

  switch (responseCode) {
  case 0:
    return results;

  case Number('3'):
    return responseCode;

  default:
    return null;
  }
};

export { fetchToken, getToken, fetchQuestions };

const fetchToken = async () => {
  const request = await fetch('https://opentdb.com/api_token.php?command=request');
  const { response_code: responseCode, token } = await request.json();
  console.log(responseCode);
  if (responseCode !== 0) throw new Error('Erro ao requisitar Token');
  localStorage.setItem('token', token);
};

const getToken = () => +localStorage.getItem('token');

const fetchQuestions = async (amount) => {
  const token = getToken();
  const request = await fetch(`https://opentdb.com/api.php?amount=${amount}&token=${token}`);
  const { response_code: responseCode, results } = request.json();
  if (responseCode !== 0) throw new Error('Erro ao fazer requisição à API');
  return results;
};

export { fetchToken, fetchQuestions };

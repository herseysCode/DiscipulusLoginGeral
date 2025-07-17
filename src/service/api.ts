
export interface UsuarioCadastro {
  nome: string;
  email: string;
  senha: string;
  tipoUsuario: number; // 1 estudante e 2 professor
}

export interface UsuarioLogin {
  email: string;
  senha: string;
}

export async function cadastrarUsuario(dados: UsuarioCadastro) {
    const resposta = await fetch('https://localhost:7228/Home/Registro', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        ...dados,
        status: 0, 
        }),
    });

  if (!resposta.ok) {
    const erro = await resposta.json();
    throw new Error(erro.message || 'Erro ao cadastrar');
  }

  return await resposta.json();
}
export async function fazerLogin(dados: UsuarioLogin) {
  const resposta = await fetch('https://localhost:7228/Home/Login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dados),
  });

  if (!resposta.ok) {
    const erro = await resposta.json();
    throw new Error(erro.message || 'Erro ao fazer login');
  }

  return await resposta.json();
}
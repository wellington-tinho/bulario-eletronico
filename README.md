## bulário eletrônico

<table>
  <tr>
    <td><video src="https://github.com/Dotlib-BR/teste-desenvolvedor-frontend/assets/26774355/d36fc7ef-f3ea-4139-91ca-5fe58207d053" controls></video></td>
    <td><video src="https://github.com/Dotlib-BR/teste-desenvolvedor-frontend/assets/26774355/1b851988-3e8e-437e-958e-585cde7454c9" controls></video></td>
  </tr>
</table>

Demo online
https://bulario-eletronico-4o1o.vercel.app/


### Checklists de funcionalidades
- [x] Implementar consulta por nome do medicamento ou laboratório farmacêutico.
- [x] Apresentar os resultados em uma listagem.
- [x] Adicionar ordenação pela data de publicação do medicamento.
- [x] Implementar paginação de 10 em 10 itens por página.
- [X] Ler o conteúdo por meio de uma API REST na pasta `api`.

### Bonus 
- [x] Menu de acessibilidade com alteração no tamanho da fonte e mudança de contraste de cores
- [x] Filtro de busca usando somente `URL State` afim de evitar re-renderizações desnecessárias
- [x] `QueryParms` -  medication, company - são passados para os filtros assim que renderiza a pagina.
- [x] Cache de dados vindos da API
- [x] Armazenamento de preferencias de acessibilidades armazenadas/recuperadas do localStorage
- [x] Download de Documentos realizado
- [x] Responsividade em dispositivos com telas pequenas / grandes

OBS:
- Não foi usado em nenhum momento useEffect
- Inicialmente a aplicação ira recuperar a preferencia de tema claro/escuro do navegador do usuário 






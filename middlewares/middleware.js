const myMiddleware = (req, res, next) => {

    // console.log(req.headers.authorization );

    const Authorization = req.get('Authorization');

    if(Authorization === undefined  || Authorization === null){
        throw new Error('Unauthorized');
    }
    const userRoles = ['ADMIN', 'MATCHMAKER', 'SHLIACH', "USER"]; 

    return { userRoles };

  };

export { myMiddleware };
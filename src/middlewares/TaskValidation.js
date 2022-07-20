const TaskModel = require('../model/TaskModel');
const {isPast } = require('date-fns');

const TaskValidation = async (req, res, next) => {

    const {macaddress, type, title,description, when} = req.body;

    if(!macaddress)
    return res.status(400).json({error: 'mac-address é obrigatório'});
    else if(!type)
    return res.status(400).json({error: 'tipo é obrigatório'});
    else if(!title)
    return res.status(400).json({error: 'título é obrigatório'});
    else if(!description)
    return res.status(400).json({error: 'descrição é obrigatório'});
    else if(!when)
    return res.status(400).json({error: 'Data e Hora são obrigatórios'});
    
    else{

        let exists;
        if(req.params.id){
            bol = req.params.id;
            
            //console.log('primeiro', req.params.id);
            exists = await TaskModel.
            findOne(
                {   '_id': { '$ne': bol },
                    'when': { '$eq': new Date(when) },
                    'macaddress': { '$in': macaddress }      
                });   
            //console.log('segundo', exists);
        }else{
            if(isPast(new Date(when)))
                return res.status(400).json({error: 'Apenas datas futuras'});
                
            exists = await TaskModel.findOne(
                {
                    'when': {'$eq': new Date(when)},
                    'macaddress': {'$in': macaddress} 
                });
        }
        if(exists){
            return res.status(400).json({ error: 'Já existe uma tarefa nesse dia e horário'});
        }
    next();
    }   
} 

module.exports = TaskValidation;
const { check, validationResult } = require('express-validator');

exports.validate = (validations) => {
    return async (request, response, next) => {
      await Promise.all(validations.map(validation => validation.run(request)));
  
      const errors = validationResult(request);
      if (errors.isEmpty()) {
        return next();
      }
  
      response.status(422).json({ errors: errors.array() });
    };
};

exports.listValidation = [
    check('name').notEmpty(),
    check('created').isISO8601()
];

exports.taskValidation = [
    check("task").custom(field => {
        if (field.length < 1) {
            return Promise.reject('Você deve informar pelo menos 1 tarefa');            
        }
        
        const validatedTasks = field.filter(task => (task.name.length > 0) && (task.description.length > 0));
        
        if (validatedTasks.length !== field.length) {
            return Promise.reject('Todas as tarefas devem conter nome e descrição');
        } 
        
        return true;
    })        
]

import { Schema } from 'mongoose';
import moment from "moment-timezone";

function timestampsPlugin(schema:Schema) {
  const tmzBrazil = () => moment.tz(Date.now(), "America/Sao_Paulo");
  schema.add(new Schema({
    createdAt: { type: Date },
    updatedAt: { type: Date }
  }));

  schema.pre('save', function(next) {
    const timeZone = tmzBrazil();
    if (this.isNew) {
      this.set('createdAt', timeZone);
      this.set('updatedAt', timeZone);
    } else if (this.isModified()) {
      if (schema.path('deletedAt') && this.get('deleted')==true) { // only works if plugin mongoose-delete set up
        this.set('deletedAt', timeZone);
      } else {
        this.set('updatedAt', timeZone);
      }
    }
    next();
  });
  schema.pre(['updateOne', 'findOneAndUpdate'], function(next) {
    this.set('updatedAt', tmzBrazil());
    next(null);
  });
};

export default timestampsPlugin;
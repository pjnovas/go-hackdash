
/**
 * User Schema
 */

const UserSchema = {
  'provider':     { type: String, required: true },
  'provider_id':  { type: Number, required: true },
  
  'username':     { type: String, required: true },
  'name':         { type: String },
  'picture':      { type: String },

  'created_at':   { type: Date, default: Date.now },
  'updated_at':   { type: Date, default: Date.now }
};

export default UserSchema;

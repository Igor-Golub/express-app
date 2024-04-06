import mongoose from "mongoose";

export const UserConfirmationSchema = new mongoose.Schema<Pick<DBModels.User, "confirmation">["confirmation"]>({
  isConfirmed: {
    type: Boolean,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  expirationDate: {
    type: Date,
    required: true,
  },
});

export const UserSchema = new mongoose.Schema<DBModels.User>(
  {
    login: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    hash: {
      type: String,
      required: true,
    },
    confirmation: {
      type: UserConfirmationSchema,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

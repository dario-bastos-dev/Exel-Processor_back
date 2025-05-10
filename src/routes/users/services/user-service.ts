import { generateToken } from '../../../configs/jwt';
import UserModel from '../models/user-model';
import type { User, UserResponse } from '../types/user';

export default class UserService {
  private removeData(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  public async createUser(name: string, email: string, password: string) {
    const model = new UserModel();

    const { data, error } = await model.createUser(name, email, password);

    let response: UserResponse;

    if (error !== null) {
      response = {
        status: 'error',
        message: 'Ocorreu um erro ao tentar criar o usuário',
        data: null,
        error: {
          code: 400,
          details: error,
        },
      };
      return { response, status: 400 };
    }

    response = {
      status: 'success',
      message: 'Usuário criado com sucesso',
      data: {
        user: this.removeData(data),
        sheet: null,
      },
      error: null,
    };
    return { response, status: 200 };
  }

  public async loginUser(email: string, password: string) {
    const model = new UserModel();

    const { data, error } = await model.loginUser(email, password);

    let response: UserResponse;

    if (error !== null) {
      response = {
        status: 'error',
        message: 'Ocorreu um erro ao tentar fazer login',
        data: null,
        error: {
          code: 400,
          details: error,
        },
      };

      return { response, status: 400 };
    }

    const token = generateToken({ id: data.id, email: data.email });

    response = {
      status: 'success',
      message: 'Login realizado com sucesso',
      data: {
        user: this.removeData(data),
        sheet: null,
      },
      token,
      error: null,
    };
    return { response, status: 200 };
  }

  public async getUser(id: string) {
    const model = new UserModel();

    const { data, error } = await model.getUser(id);

    let response: UserResponse;

    if (error !== null) {
      response = {
        status: 'error',
        message: 'Ocorreu um erro ao tentar buscar o usuário',
        data: null,
        error: {
          code: 400,
          details: error,
        },
      };
      return { response, status: 400 };
    }

    response = {
      status: 'success',
      message: 'Usuário encontrado com sucesso',
      data: {
        user: this.removeData(data),
        sheet: data.excelFiles === undefined ? null : data.excelFiles,
      },
      error: null,
    };
    return { response, status: 200 };
  }

  public async deleteUser(id: string) {
    const model = new UserModel();

    const { data, error } = await model.deleteUser(id);

    let response: UserResponse;

    if (error !== null) {
      response = {
        status: 'error',
        message: 'Ocorreu um erro ao tentar deletar o usuário',
        data: null,
        error: {
          code: 400,
          details: error,
        },
      };
      return { response, status: 400 };
    }

    response = {
      status: 'success',
      message: 'Usuário deletado com sucesso',
      data: {
        user: this.removeData(data),
        sheet: null,
      },
      error: null,
    };
    return { response, status: 200 };
  }
}

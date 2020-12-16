import Account from './../models/account';
import { SaveDB, LoadDB, ExistDB } from './db';
import { appPath } from '../constants/appPath';
import { v4 as uuid } from 'uuid';

class ServiceAccount {
  secret: string;
  accounts: Account[];

  constructor(secret: string = '') {
    this.accounts = [];
    this.secret = secret;
  }

  DataExist() {
    return ExistDB(appPath);
  }

  Load(secret: string) {
    this.secret = secret;
    this.accounts = LoadDB(appPath, secret);
    return this.accounts;
  }

  Commit() {
    SaveDB(this.accounts, appPath, this.secret);
  }

  Add(account: Account) {
    let newAccount = { ...account, id: uuid() };
    this.accounts.push(newAccount);
    this.Commit();

    return this.accounts;
  }

  Update(account: Account) {
    this.accounts = this.accounts.filter((a) => a.id !== account.id);
    this.accounts.push(account);

    this.Commit();
    return this.accounts;
  }

  Delete(id: string) {
    this.accounts = this.accounts.filter((a) => a.id !== id);
    this.Commit();
    return this.accounts;
  }

  Get(id: string) {
    return this.accounts.find((a) => a.id === id);
  }
}

export default ServiceAccount;
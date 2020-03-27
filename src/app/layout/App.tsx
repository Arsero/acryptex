import React, { useState, Fragment } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { AccountList } from "../../features/accounts/AccountList";
import { NavBar } from "../../features/nav/NavBar";
import { IAccount } from "../models/account";
import { Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";
import AccountForm from "../../features/accounts/AccountForm";

export const App = () => {
  const initialValues: IAccount[] = [
    {
      id: "1231",
      website: "baaa.com",
      email: "aaa@gmail.com",
      username: "aaauser",
      password: "aaapassword",
      comment: "cool"
    },
    {
      id: "123",
      website: "caaa.com",
      email: "aaa@gmail.com",
      username: "aaauser",
      password: "aaapassword",
      comment: "cool"
    },
    {
      id: "1232",
      website: "daaa.com",
      email: "aaa@gmail.com",
      username: "aaauser",
      password: "aaapassword",
      comment: "cool"
    },
    {
      id: "1233",
      website: "eaaa.com",
      email: "aaa@gmail.com",
      username: "aaauser",
      password: "aaapassword",
      comment: "cool"
    },
    {
      id: "1234",
      website: "faaa.com",
      email: "aaa@gmail.com",
      username: "aaauser",
      password: "aaapassword",
      comment: "cool"
    },
    {
      id: "1235",
      website: "gaaa.com",
      email: "aaa@gmail.com",
      username: "aaauser",
      password: "aaapassword",
      comment: "cool"
    },
    {
      id: "1236",
      website: "aaa.com",
      email: "aaa@gmail.com",
      username: "aaauser",
      password: "aaapassword",
      comment: "cool"
    }
  ];

  initialValues.sort((a, b) => (a.website < b.website ? -1 : 1));
  const [showPassword, setShowPassword] = useState<boolean>(true);
  const [accounts, setAccounts] = useState<IAccount[]>(initialValues);

  const handleCreateAccount = (account: IAccount) => {
    setAccounts([...accounts, account]);
    accounts.sort((a, b) => (a.website < b.website ? -1 : 1));
  };

  const handleEditAccount = (account: IAccount) => {
    setAccounts([...accounts.filter(a => a.id !== account.id), account]);
    accounts.sort((a, b) => (a.website < b.website ? -1 : 1));
  };

  const handleDeleteAccount = (id: string) => {
    setAccounts([...accounts.filter(a => a.id !== id)]);
  };

  const handleCopyPassword = (id: string) => {
    // Copy the password to the clipboard
    let pwd = accounts.find(a => a.id === id).password;
    if (pwd !== undefined) {
      navigator.clipboard.writeText(pwd);
    }
  };

  return (
    <div>
      <NavBar  />
      <Route
        exact
        path="/"
        render={() => (
          <AccountList
            showPassword={showPassword}
            accounts={accounts}
            deleteAccount={handleDeleteAccount}
            copyPassword={handleCopyPassword}
          />
        )}
      />

      <Route
        path={["/createAccount", "/manage/:id"]}
        render={() => (
          <AccountForm
            createAccount={handleCreateAccount}
            editAccount={handleEditAccount}
            account={null}
          />
        )}
      />
    </div>
  );
};

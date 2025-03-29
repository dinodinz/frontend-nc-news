import { createContext, useContext, useState } from "react";
const LoggedUserContext = createContext();
const ArticleListContext = createContext();
const TopicsContext = createContext();
const ErrorPageContext = createContext();
const HasCreatedContext = createContext();

export function AppProvider({ children }) {
  const [loggedUser, setLoggedUser] = useState(null);

  return (
    <LoggedUserContext.Provider value={{ loggedUser, setLoggedUser }}>
      {children}
    </LoggedUserContext.Provider>
  );
}

export function useLoggedUser() {
  return useContext(LoggedUserContext);
}

export function ArticleListProvider({ children }) {
  const [articles, setArticles] = useState([]);

  return (
    <ArticleListContext.Provider value={{ articles, setArticles }}>
      {children}
    </ArticleListContext.Provider>
  );
}

export function useArticleState() {
  return useContext(ArticleListContext);
}

export function TopicsProvider({ children }) {
  const [currentTopic, setCurrentTopic] = useState(null);

  return (
    <TopicsContext.Provider value={{ currentTopic, setCurrentTopic }}>
      {children}
    </TopicsContext.Provider>
  );
}

export function useTopicState() {
  return useContext(TopicsContext);
}

export function ErrorPageProvider({ children }) {
  const [errorPage, setErrorPage] = useState(null);

  return (
    <ErrorPageContext.Provider value={{ errorPage, setErrorPage }}>
      {children}
    </ErrorPageContext.Provider>
  );
}

export function useErrorPageState() {
  return useContext(ErrorPageContext);
}

export function HasCreatedProvider({ children }) {
  const [hasCreated, setHasCreated] = useState(false);

  return (
    <HasCreatedContext.Provider value={{ hasCreated, setHasCreated }}>
      {children}
    </HasCreatedContext.Provider>
  );
}

export function useHasCreatedState() {
  return useContext(HasCreatedContext);
}

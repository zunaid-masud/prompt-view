import { useState, useEffect } from 'react';
import { dataStore } from '../services/dataStore';
import { Prompt, Category, Blog, AITool, Advertisement, SiteSettings, Subscriber, User } from '../types';

export function useDataStore() {
  const [, setTick] = useState(0);

  useEffect(() => {
    const unsubscribe = dataStore.subscribe(() => {
      setTick((t) => t + 1);
    });
    return unsubscribe;
  }, []);

  const prompts = dataStore.getPrompts();
  const categories = dataStore.getCategories();
  const blogs = dataStore.getBlogs();
  const tools = dataStore.getTools();
  const ads = dataStore.getAds();
  const settings = dataStore.getSettings();
  const subscribers = dataStore.getSubscribers();
  const favorites = dataStore.getFavorites();
  const users = dataStore.getUsers();
  const isAdmin = dataStore.isAdminAuthenticated();

  return {
    prompts,
    categories,
    blogs,
    tools,
    ads,
    settings,
    subscribers,
    favorites,
    users,
    isAdmin,
    dataStore,
  };
}

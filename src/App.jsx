import { Routes, Route } from 'react-router-dom';
import CreateCollection from './components/entities/collections/createCollection';
import CollectionDetails from './components/entities/collections/collectionDetails';
import Header from './components/layout/header/header';

import Home from './components/pages/home/home';
import Store from './components/pages/store/store';
import CreateUser from './components/user/create-user';
import ItemDetails from './components/entities/items/itemDetails';
import CreateItem from './components/entities/items/createItem';
import EditItem from './components/entities/items/editItem';
import WishlistList from './components/entities/wishlists/wishlistList';
import WishlistDetails from './components/entities/wishlists/wishlistDetails';
import CreateWishlist from './components/entities/wishlists/createWishlist';
import EditWishlist from './components/entities/wishlists/editWishlist';
import EditCollection from './components/entities/collections/editCollection';
import CartDetails from './components/entities/cart/cartDetails';
import { useItems } from './hooks/dataFetching/useItems';
import { useCollections } from './hooks/dataFetching/useCollections';

import { Toaster } from 'sonner';

function App() {
  const { data: items } = useItems();
  const { data: collections } = useCollections();

  return (
    <>
      <Header />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<Store items={items} />} />
          <Route path="/collections/:collectionId" element={<CollectionDetails items={items} />} />
          <Route path="/wishlists" element={<WishlistList />} />
          <Route path="/wishlists/:wishlistId" element={<WishlistDetails items={items} />} />
          <Route path="/create-user" element={<CreateUser />} />
          <Route path="/create-item" element={<CreateItem />} />
          <Route path="/edit-item/:itemId" element={<EditItem />} />
          <Route
            path="/edit-collection/:collectionId"
            element={<EditCollection collections={collections} />}
          />
          <Route path="/create-collection" element={<CreateCollection />} />
          <Route path="/edit-wishlist/:wishlistId" element={<EditWishlist />} />
          <Route path="/create-wishlist" element={<CreateWishlist />} />
          <Route path="/item/:itemId" element={<ItemDetails />} />
          <Route path="/cart" element={<CartDetails />} />
        </Routes>
      </main>
      <Toaster richColors />
    </>
  );
}

export default App;

import React, { useContext, useEffect, useReducer } from 'react'
import {
	ADD_TO_CART,
	CLEAR_CART,
	COUNT_CART_TOTALS,
	REMOVE_CART_ITEM,
	TOGGLE_CART_ITEM_AMOUNT,
} from '../actions'
import reducer from '../reducers/cart_reducer'

function getLocalStorage() {
	let cart = localStorage.getItem('cart')
	if (cart) {
		return JSON.parse(cart)
	} else {
		return []
	}
}

const initialState = {
	cart: getLocalStorage(),
	total_items: 0,
	total_amount: 0,
	shipping_fee: 534,
}

const CartContext = React.createContext()

export const CartProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState)

	//add to cart
	function addToCart(id, color, amount, product) {
		dispatch({ type: ADD_TO_CART, payload: { id, color, amount, product } })
	}

	function removeItem(id) {
		dispatch({ type: REMOVE_CART_ITEM, payload: id })
	}

	function toggleAmount(id, value) {
		dispatch({ type: TOGGLE_CART_ITEM_AMOUNT, payload: { id, value } })
	}

	function clearCart() {
		dispatch({ type: CLEAR_CART })
	}

	useEffect(() => {
		localStorage.setItem('cart', JSON.stringify(state.cart))

		dispatch({ type: COUNT_CART_TOTALS })
	}, [state.cart])

	return (
		<CartContext.Provider
			value={{ ...state, addToCart, removeItem, toggleAmount, clearCart }}
		>
			{children}
		</CartContext.Provider>
	)
}
// make sure use
export const useCartContext = () => {
	return useContext(CartContext)
}

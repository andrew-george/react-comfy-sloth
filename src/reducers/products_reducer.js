import {
	GET_PRODUCTS_BEGIN,
	GET_PRODUCTS_ERROR,
	GET_PRODUCTS_SUCCESS,
	GET_SINGLE_PRODUCT_BEGIN,
	GET_SINGLE_PRODUCT_ERROR,
	GET_SINGLE_PRODUCT_SUCCESS,
	SIDEBAR_CLOSE,
	SIDEBAR_OPEN,
} from '../actions'

const products_reducer = (state, action) => {
	//////////////////////////////////////////////////////////
	//- sidebar
	if (action.type === SIDEBAR_OPEN) {
		return { ...state, isSidebarOpen: true }
	}

	if (action.type === SIDEBAR_CLOSE) {
		return { ...state, isSidebarOpen: false }
	}
	//////////////////////////////////////////////////////////
	//- products

	if (action.type === GET_PRODUCTS_BEGIN) {
		return { ...state, products_loading: true }
	}

	if (action.type === GET_PRODUCTS_SUCCESS) {
		const featured_products = action.payload.filter(
			product => product.featured === true
		)
		return {
			...state,
			products_loading: false,
			products: action.payload,
			featured_products,
		}
	}

	if (action.type === GET_PRODUCTS_ERROR) {
		return { ...state, products_error: true, products_loading: false }
	}
	//////////////////////////////////////////////////////////
	//- single product

	if (action.type === GET_SINGLE_PRODUCT_BEGIN) {
		return {
			...state,
			single_product_loading: true,
			single_product_error: false,
		}
	}

	if (action.type === GET_SINGLE_PRODUCT_SUCCESS) {
		return {
			...state,
			single_product_loading: false,
			single_product: action.payload,
		}
	}

	if (action.type === GET_SINGLE_PRODUCT_ERROR) {
		return {
			...state,
			single_product_error: true,
			single_product_loading: false,
		}
	}
	//////////////////////////////////////////////////////////

	throw new Error(`No matching '${action.type}' - action type`)
}

export default products_reducer

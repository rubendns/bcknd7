import ProductService from "../../services/productService.js";
// ProductService.model.paginate(); el model

class ProductController {
	constructor() {
		this.ProductService = new ProductService();
	}

	async getProducts(req, res) {
		try {
			// await this.
			const products = ProductService.getProducts(req, res);
			res.send(products);
		} catch (error) {
			res
				.status(500)
				.send({ status: "error", message: "Error fetching products." });
			console.log(error);
		}
	}

	async getProductById(req, res) {
		try {
			const product = await ProductService.getProductById(req, res);
			if (!product || product == "")
				return res.json({ message: "Product not found" });
			res.json({ product });
		} catch (error) {
			console.log(error);
			res.json({
				message: "Error",
				error,
			});
		}
	}

	async createProduct(req, res) {
		try {
			const response = await ProductService.createProduct(req, res);
			res.json({ message: "Ok", response });
		} catch (error) {
			console.log(error);
			res.json({
				message: "Error",
				error,
			});
		}
	}

	async updateProduct(req, res) {
		try {
			const response = await ProductService.updateProduct(req, res);
			if (response.modifiedCount == 0)
				return res.json({ error: "Product not updated" });
			res.json({ response });
		} catch (error) {
			console.log(error);
			res.json({
				message: "Error",
				error,
			});
		}
	}

	async deleteProduct(req, res) {
		try {
			const response = await ProductService.deleteProduct(req, res);
			if (!response) return res.json({ error: "Product not found" });
			res.json({ response });
		} catch (error) {
			console.log(error);
			res.json({
				message: "Error",
				error,
			});
		}
	}
}

export default new ProductController();
import CartService from "../../services/cartService.js";

class CartController {
    constructor() {
        this.cartService = new CartService();
    }
    
    async getCartByUser(req, res) {
        try {
            const userId = req.params.cid;
            const cart = await CartService.getCartByUser(userId);

            if (!cart || cart === '') return res.json({ message: "Cart not found" });

            res.json({ cart });
        } catch (error) {
            console.log(error);
            res.json({
                message: "Error",
                error
            });
        }
    }

    async addToCart(req, res) {
        try {
            const userId = req.params.cid;
            const productId = req.params.pid;
            const quantity = req.body.quantity;
            const response = await CartService.addToCart(userId, productId, quantity);
            if (response.modifiedCount === 0) {
                return res.json({ error: "Cart not updated" });
            }
    
            res.json({ response });
        } catch (error) {
            console.log(error);
            res.json({
                message: "Error",
                error
            });
        }
    }

    async updateProductQuantity(req, res) {
        try {
            const { cid, pid } = req.params;
            const newQuantity = req.body.quantity;
            await CartService.updateProductQuantity(cid, pid, newQuantity);
            res.json({ status: "success", message: "Product quantity updated in the cart" });
        } catch (error) {
            console.log(error);
            res.json({ status: "error", message: "Error updating product quantity in the cart", error });
        }
    }

    async updateCart(req, res) {
        try {
            const { cid } = req.params;
            const newProducts = req.body.products;
            await CartService.updateCart(cid, newProducts);
            res.json({ status: "success", message: "Cart updated successfully" });
        } catch (error) {
            console.log(error);
            res.json({ status: "error", message: "Error updating cart", error });
        }
    }

    async removeFromCart(req, res) {
        try {
            const { cid, pid } = req.params;
            await CartService.removeFromCart(cid, pid);
            res.json({ status: "success", message: "Product removed from the cart" });
        } catch (error) {
            console.log(error);
            res.json({ status: "error", message: "Error removing product from the cart", error });
        }
    }

    async clearCart(req, res) {
        try {
            const cartId = req.params.cid;
            const response = await CartService.clearCart(cartId);
            if (!response) {
                return res.json({ error: "Cart not found" });
            }
            res.json({ response });
        } catch (error) {
            console.log(error);
            res.json({
                message: "Error",
                error
            });
        }
    }
}

export default new CartController();
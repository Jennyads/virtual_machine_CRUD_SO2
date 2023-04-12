"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../data-source");
const Product_1 = require("../entities/Product");
class ProductController {
    getHistoricProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const prodRepository = data_source_1.default.getRepository(Product_1.Product);
            const allProd = yield prodRepository.find();
            console.log(allProd);
            return res.json(allProd);
        });
    }
    getProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const idProd = req.params.uuid;
            const prodRepository = data_source_1.default.getRepository(Product_1.Product);
            const allProd = yield prodRepository.findOneBy({ id: idProd });
            return res.json(allProd);
        });
    }
    postProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const createProduct = req.body;
            const prodRepository = data_source_1.default.getRepository(Product_1.Product);
            const insertProduct = new Product_1.Product();
            insertProduct.prodTitle = createProduct.prodTitle;
            insertProduct.prodDescription = createProduct.prodDescription;
            insertProduct.prodPrice = createProduct.prodPrice;
            const allProd = yield prodRepository.save(insertProduct);
            return res.json(allProd);
        });
    }
    putProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const createProduct = req.body;
            const idProd = req.params.uuid;
            const prodRepository = data_source_1.default.getRepository(Product_1.Product);
            const findProduct = yield prodRepository.findOneBy({ id: idProd });
            findProduct.prodTitle = createProduct.prodTitle;
            findProduct.prodDescription = createProduct.prodDescription;
            findProduct.prodPrice = createProduct.prodPrice;
            const allProd = yield prodRepository.save(findProduct);
            return res.json(allProd);
        });
    }
    deleteProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const idProd = req.params.uuid;
            const prodRepository = data_source_1.default.getRepository(Product_1.Product);
            const findProduct = yield prodRepository.findOneBy({ id: idProd });
            const allProd = yield prodRepository.remove(findProduct);
            return res.json(allProd);
        });
    }
}
exports.default = new ProductController();

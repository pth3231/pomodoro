declare namespace Express {
    interface Request {
        /**
         * Custom payload attached by middlewares
         */
        authPayload?: {
            decoded: any
        }
    }
}
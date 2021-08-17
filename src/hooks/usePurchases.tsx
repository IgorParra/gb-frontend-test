import api from "services/api";
import { useQuery } from "react-query";
import { formatDate, formatPrice } from "util/format";
import { GetUserReponse, PurchasesData } from "types";

export async function getPurchases(page: number): Promise<GetUserReponse> {
	const { data, headers } = await api.get("purchases", { params: { page } });

	const totalCount = Number(headers["x-total-count"]);

	const purchases = data.map((purchase: PurchasesData) => {
		return {
			code: purchase.code,
			buyed_at: formatDate(purchase.buyed_at),
			value: formatPrice(purchase.value),
			cashback: formatPrice(purchase.cashback),
			status: purchase.status,
			percentCashback: `${((purchase.cashback * 100) / purchase.value).toFixed(
				2
			)}%`,
		};
	});
	return { purchases, totalCount };
}

export const usePurchases = (page: number) => {
	return useQuery(["purchases", page], () => getPurchases(page), {
		staleTime: 6 * 10000, // 1 minuto para teste
	});
};

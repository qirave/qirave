import DB from "@/database";
import schema from '@/database/schema';
import CATEGORIES from "@/lib/data/category";
import TAXES from "@/lib/data/tax";


const categoriesSeed = async () => {
    console.log("Categories seed started");
    await DB.insert(schema.categories).values(CATEGORIES).execute();
    console.log("Categories seed completed");
};

const taxesSeed = async () => {
    console.log("Taxes seed started");
    await DB.insert(schema.taxes).values(TAXES).execute();
    console.log("Taxes seed completed");
};

// run the seed function 1 by 1
categoriesSeed().catch(e => console.error("CATESGORIES SEED ERROR", e));
taxesSeed().catch(e => console.error("TAXES SEED ERROR", e));
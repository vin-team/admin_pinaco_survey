"use client";

import Filter from "@/components/team/Filter";
import Table  from "@/components/team/Table";


export default function Team() {
    return (
        <div className="w-full h-full flex flex-col">
            {/* Thanh lọc */}
            <Filter />
            <Table />
        </div>
    );
}
import { useState, useContext } from "react";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";
import UserHeader from "../components/UserHeader";
import DriverHeader from "../components/DriverHeader";
import UserFooter from "../components/UserFooter";
import DriverFooter from "../components/DriverFooter";

export default function Profile() {
    const { user, setUser } = useContext(AuthContext);

    const [name, setName] = useState(user?.name || "");
    const [email, setEmail] = useState(user?.email || "");
    const [phone, setPhone] = useState(user?.phone || "");

    const [vehicleType, setVehicleType] = useState(
        user?.vehicleDetails?.vehicleType || ""
    );

    const [vehicleNumber, setVehicleNumber] = useState(
        user?.vehicleDetails?.vehicleNumber || ""
    );

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const [loadingAccount, setLoadingAccount] = useState(false);
    const [loadingPassword, setLoadingPassword] = useState(false);

    async function updateAccount(e) {
        e.preventDefault();

        try {
            setLoadingAccount(true);

            const res = await API.post("/users/update-account-details", {
                name,
                email,
                phone,
                vehicleType,
                vehicleNumber,
            });

            setUser(res.data.data);

            alert("Account updated successfully");
        } catch (error) {
            alert(error?.response?.data?.message);
        } finally {
            setLoadingAccount(false);
        }
    }

    async function changePassword(e) {
        e.preventDefault();

        try {
            setLoadingPassword(true);

            await API.post("/users/change-password", {
                oldPassword,
                newPassword,
            });

            alert("Password changed successfully");

            setOldPassword("");
            setNewPassword("");
        } catch (error) {
            alert(error?.response?.data?.message);
        } finally {
            setLoadingPassword(false);
        }
    }

    return (
        <div className="bg-[#f8f8f5] min-h-screen flex flex-col font-[Inter]">

            {user?.role === "driver" ? <DriverHeader /> : <UserHeader />}

            <main className="flex-1 flex justify-center py-12 px-4">
                <div className="max-w-3xl w-full flex flex-col gap-10">

                    <div>
                        <h1 className="text-3xl font-black text-slate-900">Profile</h1>
                        <p className="text-slate-500 mt-1">
                            Manage your account settings
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">

                        <h2 className="text-xl font-bold mb-6">Account Details</h2>

                        <form
                            onSubmit={updateAccount}
                            className="grid md:grid-cols-2 gap-5"
                        >

                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium text-slate-700">
                                    Name
                                </label>
                                <input
                                    className="p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#f5c400] outline-none"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>


                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium text-slate-700">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    className="p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#f5c400] outline-none"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div className="flex flex-col gap-1 md:col-span-2">
                                <label className="text-sm font-medium text-slate-700">
                                    Phone
                                </label>
                                <input
                                    className="p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#f5c400] outline-none"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>

                            {user?.role === "driver" && (
                                <>
                                    <div className="md:col-span-2 border-t pt-6 mt-4">
                                        <h3 className="text-lg font-semibold mb-4">
                                            Vehicle Information
                                        </h3>
                                    </div>

                                    <div className="flex flex-col gap-1">
                                        <label className="text-sm font-medium text-slate-700">
                                            Vehicle Type
                                        </label>
                                        <input
                                            className="p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#f5c400] outline-none"
                                            value={vehicleType}
                                            onChange={(e) => setVehicleType(e.target.value)}
                                        />
                                    </div>

                                    <div className="flex flex-col gap-1">
                                        <label className="text-sm font-medium text-slate-700">
                                            Vehicle Number
                                        </label>
                                        <input
                                            className="p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#f5c400] outline-none"
                                            value={vehicleNumber}
                                            onChange={(e) => setVehicleNumber(e.target.value)}
                                        />
                                    </div>
                                </>
                            )}

                            <div className="md:col-span-2 flex justify-end mt-2">
                                <button
                                    type="submit"
                                    disabled={loadingAccount}
                                    className="px-6 py-3 bg-[#f5c400] hover:bg-[#e4b700] transition rounded-lg font-semibold"
                                >
                                    {loadingAccount ? "Updating..." : "Update Details"}
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">

                        <h2 className="text-xl font-bold mb-6">Change Password</h2>

                        <form
                            onSubmit={changePassword}
                            className="grid md:grid-cols-2 gap-5"
                        >

                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium text-slate-700">
                                    Old Password
                                </label>
                                <input
                                    type="password"
                                    className="p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#f5c400] outline-none"
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                />
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium text-slate-700">
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    className="p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#f5c400] outline-none"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                            </div>

                            <div className="md:col-span-2 flex justify-end mt-2">
                                <button
                                    type="submit"
                                    disabled={loadingPassword}
                                    className="px-6 py-3 bg-[#f5c400] hover:bg-[#e4b700] transition rounded-lg font-semibold"
                                >
                                    {loadingPassword ? "Changing..." : "Change Password"}
                                </button>
                            </div>

                        </form>
                    </div>

                </div>
            </main>

            {user?.role === "driver" ? <DriverFooter /> : <UserFooter />}
        </div>
    );
}
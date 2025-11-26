import { useQuery } from "@tanstack/react-query";
import React from "react";
import UseAuth from "../hooks/UseAuth";
import UseAxios from "../hooks/UseAxios";
import { FilePen, Loader2, ScanSearch, Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const MyParcels = () => {
  const { user } = UseAuth();
  const axiosSecure = UseAxios();
  const navigate = useNavigate();

  const {
    data: parcels = [],
    refetch,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["myParcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user?.email}`);
      return res.data;
    },
  });

  // delete part.................

  const handleDelete = (id) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/parcels/${id}`).then((res) => {
          console.log(res.data);
          if (res.data.deletedCount) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="animate-spin w-8 h-8 text-green-600" />
      </div>
    );

  if (isError)
    return (
      <p className="text-center text-red-500 font-semibold mt-10">
        Failed to load parcels.
      </p>
    );

  const getStatusColor = (status) => {
    if (status === "Delivered") return "bg-green-600";
    if (status === "In Transit") return "bg-yellow-500";
    return "bg-red-600";
  };

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-[#CAEB66] hover:bg-[#b0d65b] rounded-xl transition-all duration-200"
      >
        ← Back
      </button>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          My Parcels
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          You have {parcels.length} parcels in your list.
        </p>
      </div>

      {/* Table Container */}
      <div className="bg-white shadow-xl rounded-2xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left hidden md:table">
            <thead className="bg-gray-100 border-b border-gray-300">
              <tr>
                <th className="py-3 px-4 text-sm font-semibold text-gray-700">
                  #
                </th>
                <th className="py-3 px-4 text-sm font-semibold text-gray-700">
                  Parcel Name
                </th>
                <th className="py-3 px-4 text-sm font-semibold text-gray-700">
                  Cost
                </th>
                <th className="py-3 px-4 text-sm font-semibold text-gray-700">
                  Action
                </th>
                <th className="py-3 px-4 text-sm font-semibold text-gray-700">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {parcels.map((parcel, index) => (
                <tr
                  key={parcel._id}
                  className="hover:bg-gray-50 transition-colors border-b last:border-none"
                >
                  <td className="py-3 px-4 text-sm">{index + 1}</td>

                  <td className="py-3 px-4 text-sm font-medium text-gray-900">
                    {parcel.parcelName}
                  </td>

                  <td className="py-3 px-4 text-sm">{parcel.cost}</td>

                  <td className="py-3 px-4 text-sm flex items-center gap-4">
                    <button
                      className="btn btn-xs"
                      onClick={() =>
                        navigate(`/dashBoard/parcel/${parcel._id}`)
                      }
                    >
                      <ScanSearch />
                    </button>
                    <button
                      className="btn btn-xs"
                      onClick={() =>
                        navigate(`/dashBoard/parcel/${parcel._id}/edit`)
                      }
                    >
                      <FilePen />
                    </button>
                    <button
                      onClick={() => handleDelete(parcel._id)}
                      className="btn btn-xs"
                    >
                      <Trash2 />
                    </button>
                  </td>

                  <td className="py-3 px-4 text-sm">
                    <span
                      className={`px-3 py-1 rounded-full text-white text-xs font-medium ${getStatusColor(
                        parcel.status
                      )}`}
                    >
                      {parcel.status || "Pending"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* 📱 MOBILE VERSION */}
          <div className="md:hidden p-4 space-y-4">
            {parcels.map((parcel, index) => (
              <div
                key={parcel._id}
                className="border rounded-xl p-4 shadow-sm bg-white"
              >
                <div className="flex justify-between mb-2">
                  <span className="text-gray-500 text-xs">#{index + 1}</span>
                  <span
                    className={`px-2 py-1 rounded-full text-white text-xs ${getStatusColor(
                      parcel.status
                    )}`}
                  >
                    {parcel.status}
                  </span>
                </div>

                <div className="mb-1">
                  <p className="text-xs text-gray-500">Parcel Name</p>
                  <p className="font-semibold">{parcel.parcelName}</p>
                </div>

                <div className="mb-3">
                  <p className="text-xs text-gray-500">Cost</p>
                  <p>${parcel.cost}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-4 pt-2 border-t mt-3">
                  <button
                    className="btn btn-xs"
                    onClick={() => navigate(`/dashBoard/parcel/${parcel._id}`)}
                  >
                    <ScanSearch size={16} />
                  </button>
                  <button
                    className="btn btn-xs"
                    onClick={() =>
                      navigate(`/dashBoard/parcel/${parcel._id}/edit`)
                    }
                  >
                    <FilePen size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(parcel._id)}
                    className="btn btn-xs"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyParcels;

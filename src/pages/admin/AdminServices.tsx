
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ServiceCategory, Service } from "@/types/roomTypes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { ServiceCategoryCard } from "@/components/admin/ServiceCategoryCard";
import { useToast } from "@/hooks/use-toast";

const AdminServices = () => {
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchCategories();
    fetchServices();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("service_categories")
        .select("*")
        .order("name");

      if (error) throw error;

      setCategories(data as ServiceCategory[]);
    } catch (error) {
      console.error("Error fetching service categories:", error);
      toast({
        title: "Error",
        description: "Could not load service categories",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchServices = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .order("name");

      if (error) throw error;

      setServices(data as Service[]);
    } catch (error) {
      console.error("Error fetching services:", error);
      toast({
        title: "Error",
        description: "Could not load services",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEditCategory = (category: ServiceCategory) => {
    // To be implemented - open edit dialog
    console.log("Edit category:", category);
    toast({
      title: "Coming Soon",
      description: "Edit functionality will be added soon",
    });
  };

  const handleDeleteCategory = async (id: string) => {
    try {
      const { error } = await supabase
        .from("service_categories")
        .delete()
        .eq("id", id);

      if (error) throw error;

      setCategories(categories.filter(category => category.id !== id));
      toast({
        title: "Success",
        description: "Service category deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting category:", error);
      toast({
        title: "Error",
        description: "Could not delete service category",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Hotel Services</h1>

      <Tabs defaultValue="categories">
        <TabsList className="mb-6">
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
        </TabsList>

        <TabsContent value="categories">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Service Categories</h2>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Category
            </Button>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((category) => (
                <ServiceCategoryCard
                  key={category.id}
                  category={category}
                  onEdit={handleEditCategory}
                  onDelete={handleDeleteCategory}
                />
              ))}

              {categories.length === 0 && (
                <div className="col-span-full text-center py-8">
                  <p className="text-slate-500">No service categories found</p>
                </div>
              )}
            </div>
          )}
        </TabsContent>

        <TabsContent value="services">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Services</h2>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Service
            </Button>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {services.map((service) => (
                <Card key={service.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{service.name}</h3>
                        {service.description && (
                          <p className="text-sm text-slate-600 mt-1">{service.description}</p>
                        )}
                      </div>
                      <div className={`px-2 py-1 rounded text-xs ${
                        service.is_available 
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {service.is_available ? 'Available' : 'Unavailable'}
                      </div>
                    </div>
                    {service.price && (
                      <div className="mt-3 font-bold">${service.price}</div>
                    )}
                  </CardContent>
                </Card>
              ))}

              {services.length === 0 && (
                <div className="col-span-full text-center py-8">
                  <p className="text-slate-500">No services found</p>
                </div>
              )}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminServices;

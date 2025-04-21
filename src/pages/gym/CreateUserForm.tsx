import { Button, Form, Input, DatePicker, InputNumber } from "antd";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import dayjs from "dayjs";

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters"),
  email: yup
    .string()
    .required("Email is required")
    .email("Must be a valid email"),
  phone: yup
    .string()
    .required("Phone is required")
    .matches(/^\+?[\d\s-]+$/, "Invalid phone number"),
  address: yup
    .string()
    .required("Address is required")
    .min(5, "Address must be at least 5 characters"),
  paymentAmount: yup
    .number()
    .required("Payment amount is required")
    .min(0, "Payment amount must be positive"),
  subscriptionStart: yup.date().required("Start date is required"),
  subscriptionEnd: yup
    .date()
    .required("End date is required")
    .min(yup.ref("subscriptionStart"), "End date must be after start date"),
});

interface CreateUserFormProps {
  onSuccess: () => void;
  initialData?: any;
}

const CreateUserForm = ({ onSuccess, initialData }: CreateUserFormProps) => {
  // Transform initial dates to dayjs objects if they exist
  const formattedInitialData = initialData
    ? {
        ...initialData,
        subscriptionStart: initialData.subscriptionStart
          ? dayjs(initialData.subscriptionStart)
          : undefined,
        subscriptionEnd: initialData.subscriptionEnd
          ? dayjs(initialData.subscriptionEnd)
          : undefined,
      }
    : {
        name: "",
        email: "",
        phone: "",
        address: "",
        paymentAmount: 0,
        subscriptionStart: undefined,
        subscriptionEnd: undefined,
      };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: formattedInitialData,
  });

  const onSubmit = async (data: any) => {
    try {
      // Convert dayjs objects back to string format before submitting
      const formattedData = {
        ...data,
        subscriptionStart: data.subscriptionStart
          ? data.subscriptionStart.format("YYYY-MM-DD")
          : null,
        subscriptionEnd: data.subscriptionEnd
          ? data.subscriptionEnd.format("YYYY-MM-DD")
          : null,
      };
      console.log("Form data:", formattedData);
      onSuccess();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Form
      layout="vertical"
      onFinish={handleSubmit(onSubmit)}
      className="w-full"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
        {/* Personal Information Section */}
        <div className="md:col-span-2">
          <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
        </div>
        <Form.Item
          label="Name"
          validateStatus={errors.name ? "error" : ""}
          help={`${errors.name?.message || ""}`}
          className="mb-2"
        >
          <Controller
            name="name"
            control={control}
            render={({ field }) => <Input {...field} />}
          />
        </Form.Item>
        <Form.Item
          label="Email"
          validateStatus={errors.email ? "error" : ""}
          help={`${errors.email?.message || ""}`}
          className="mb-2"
        >
          <Controller
            name="email"
            control={control}
            render={({ field }) => <Input {...field} />}
          />
        </Form.Item>
        <Form.Item
          label="Phone"
          validateStatus={errors.phone ? "error" : ""}
          help={`${errors.phone?.message || ""}`}
          className="mb-2"
        >
          <Controller
            name="phone"
            control={control}
            render={({ field }) => <Input {...field} />}
          />
        </Form.Item>
        <Form.Item
          label="Address"
          validateStatus={errors.address ? "error" : ""}
          help={`${errors.address?.message || ""}`}
          className="mb-2"
        >
          <Controller
            name="address"
            control={control}
            render={({ field }) => <Input {...field} />}
          />
        </Form.Item>
        {/* Subscription Details Section */}
        <div className="md:col-span-2 mt-6">
          <h2 className="text-lg font-semibold mb-4">Subscription Details</h2>
        </div>
        <Form.Item
          label="Payment Amount"
          validateStatus={errors.paymentAmount ? "error" : ""}
          help={`${errors.paymentAmount?.message || ""}`}
          className="mb-2"
        >
          <Controller
            name="paymentAmount"
            control={control}
            render={({ field }) => (
              <InputNumber
                {...field}
                prefix="$"
                style={{ width: "100%" }}
                precision={2}
              />
            )}
          />
        </Form.Item>
        <div className="hidden md:block" /> {/* Spacer for grid alignment */}
        <Form.Item
          label="Subscription Start Date"
          validateStatus={errors.subscriptionStart ? "error" : ""}
          help={`${errors.subscriptionStart?.message || ""}`}
          className="mb-2"
        >
          <Controller
            name="subscriptionStart"
            control={control}
            render={({ field }) => (
              <DatePicker
                {...field}
                style={{ width: "100%" }}
                value={field.value ? dayjs(field.value) : null}
              />
            )}
          />
        </Form.Item>
        <Form.Item
          label="Subscription End Date"
          validateStatus={errors.subscriptionEnd ? "error" : ""}
          help={`${errors.subscriptionEnd?.message || ""}`}
          className="mb-2"
        >
          <Controller
            name="subscriptionEnd"
            control={control}
            render={({ field }) => (
              <DatePicker
                {...field}
                style={{ width: "100%" }}
                value={field.value ? dayjs(field.value) : null}
              />
            )}
          />
        </Form.Item>
        {/* Action Buttons */}
        <div className="md:col-span-2 flex justify-end gap-2 mt-6">
          <Button onClick={() => onSuccess()} className="mr-2">
            Cancel
          </Button>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </div>
      </div>
    </Form>
  );
};

export default CreateUserForm;


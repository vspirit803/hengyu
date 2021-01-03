<template>
  <div>A类意向客户</div>

</template>

<script>
import { computed, defineComponent, onMounted, Ref, ref } from '@vue/composition-api';

import { ClassAIntendedCustomersService } from '../../api/markets';

import { mapGetters } from 'vuex';
import { useStore } from '../../use';

export default {
  name: 'intendedCustomers',
  setup() {
    const intendedCustomers = ref([]);
    // const permissions = usePermissions('ClassAIntendedCustomers');
    const isDialogVisible = ref(false);
    const customerModel = ref({});

    // const canEditPersonInCharge = validatePermission(permissions, 'EditPersonInCharge'); //可修改负责人

    async function refresh() {
      intendedCustomers.value = [];
      // const { data } = await ClassAIntendedCustomersService.getClassAIntendedCustomers();
      // intendedCustomers.value = data;
    }

    function onEdit(item) {
      customerModel.value = { ...item };
      isDialogVisible.value = true;
    }

    function onCreate() {
      customerModel.value = {};
      isDialogVisible.value = true;
    }

    async function onSubmit() {
      if (customerModel.value.id) {
        await ClassAIntendedCustomersService.updateClassAIntendedCustomer(customerModel.value);
      } else {
        await ClassAIntendedCustomersService.createClassAIntendedCustomer(customerModel.value);
      }

      refresh();
      isDialogVisible.value = false;
    }

    onMounted(() => {
      refresh();
      console.log(useStore().getters.elements);
    });

    return {
      intendedCustomers,
      // canEditPersonInCharge,
      isDialogVisible,
      onEdit,
      onCreate,
      customerModel,
      isEdit: computed(() => customerModel.value && customerModel.value.id !== undefined),
      onSubmit,
      refresh,
    };
  },
};
</script>

<style>
</style>
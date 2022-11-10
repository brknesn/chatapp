<template>
  <div class="col-2 d-flex flex-column p-0 users">
    <div class="d-flex flex-column">
      <div class="d-flex flex-row justify-content-between mx-1 m-2 w-90">
        <h5 class="fw-bold mt-auto mr-2">User List</h5>
      </div>
      <a
        v-for="channelUser in channelUsers"
        :key="channelUser.id"
        href="#"
        class="user p-1 m-2 mx-2 d-flex flex-row align-items-center gap-2"
      >
        <img
          :src="
            channelUser?.avatar ||
            'https://media-exp1.licdn.com/dms/image/C4D03AQG9dpL0gShAag/profile-displayphoto-shrink_200_200/0/1580839598511?e=1673481600&v=beta&t=Leb3lkLIP3MfdNKJHQEVtVo47sPSGZssdSue0e_Yv8Y'
          "
          width="38"
          height="38"
          alt="avatar"
        />
        <span>{{ channelUser.username }}</span>
      </a>
    </div>
  </div>
</template>

<script>
import { inject } from "@vue/runtime-core";

export default {
  name: "Users",
  setup() {
    const store = inject("store");
    const { channelUsers } = store();
    return {
      channelUsers,
    };
  },
};
</script>

<style scoped>
.users {
  background: #f5f5f5;
}
a:hover {
  background: #dfecd1;
  border-radius: 5px;
}
.user span {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
@media screen and (max-width: 1024px) {
  .users {
    display: none !important;
  }
}
</style>

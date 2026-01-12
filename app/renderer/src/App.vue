<script setup lang="ts">
  import Calendar from '@/components/Calendar.vue';
  import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
  import { Toaster } from '@/components/ui/sonner';
  import { Minus, Square, X } from 'lucide-vue-next';

  // Electron 윈도우 제어 함수
  const minimizeWindow = async () => {
    croffle.base.windows.minimize();
  };
  const maximizeWindow = async () => {
    croffle.base.windows.maximize();
  };
  const closeWindow = async () => {
    croffle.base.windows.close();
  };
</script>

<template>
  <div class="flex h-screen flex-col overflow-hidden bg-[#FDFBF7] font-sans text-[#4A4A4A]">
    <!-- 커스텀 타이틀 바 -->
    <div
      class="drag-region z-50 flex h-8 shrink-0 justify-between border-b border-[#F0EAD6] bg-[#FDFBF7]"
    >
      <div class="flex items-center gap-2 pl-4">
        <div class="h-3 w-3 rounded-full bg-[#DCA780]"></div>
        <span class="text-xs font-bold text-[#4A4A4A]">Croffle</span>
      </div>

      <div class="no-drag flex h-full">
        <button
          class="flex h-full w-12 items-center justify-center text-gray-500 transition-colors hover:bg-gray-200 hover:text-gray-900"
          aria-label="Minimize window"
          @click="minimizeWindow"
        >
          <Minus class="h-4 w-4" />
        </button>

        <button
          class="flex h-full w-12 items-center justify-center text-gray-500 transition-colors hover:bg-gray-200 hover:text-gray-900"
          aria-label="Maximize window"
          @click="maximizeWindow"
        >
          <Square class="h-3 w-3" />
        </button>

        <button
          class="flex h-full w-12 items-center justify-center text-gray-500 transition-colors hover:bg-red-600 hover:text-red-100"
          aria-label="Close window"
          @click="closeWindow"
        >
          <X class="h-4 w-4" />
        </button>
      </div>
    </div>

    <!-- 메인 콘텐츠 영역 -->
    <div class="relative min-h-0 flex-1">
      <!-- 사이드바 및 캘린더 -->
      <SidebarProvider class="h-full min-h-full w-full">
        <SidebarInset class="flex h-full flex-col bg-[#FDFBF7]">
          <!-- 캘린더 영역 -->
          <div class="flex-1 overflow-hidden p-4">
            <Calendar />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
    <Toaster />
  </div>
</template>

<style scoped>
  /* 드래그 영역 설정 */
  .drag-region {
    -webkit-app-region: drag;
  }
  /* 드래그 영역 제외 */
  .no-drag {
    -webkit-app-region: no-drag;
  }
</style>

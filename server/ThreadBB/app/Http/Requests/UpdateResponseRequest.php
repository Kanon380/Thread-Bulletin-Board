<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateResponseRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'response_id' => ['required', 'numeric'],
            'content' => ['required', 'max:10']
        ];
    }

    public function messages()
    {
        return [
            'response_id.required' => '必須項目がありません、管理者にお問い合わせ下さい。',
            'response_id.numeric' => 'データの型が正しくありません、管理者にお問い合わせ下さい。',
            'content.required' => 'レスの内容は必須項目です',
            'content.max' => 'レスの内容は10文字以内です'
        ];
    }
}

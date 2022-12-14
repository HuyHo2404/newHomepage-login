<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\RefreshToken;
use Illuminate\Http\Request;
use App\Models\User;
use Validator;
use Illuminate\Support\Facades\Hash;
use Mail;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Str;
use Illuminate\Support\Carbon;
use Tymon\JWTAuth\Facades\JWTAuth;
use JWTAuthException;

class UserController extends Controller
{
  private $user;

  public function __construct(User $user)
  {
    $this->user = $user;
  }
  // register
  public function register(Request $request)
  {
    $validator = Validator::make($request->all(), [
      'first_name' => 'required|string|min:2|max:255',
      'last_name' => 'required|string|min:2|max:255',
      'address' => 'string|min:2|max:255',
      'phone_number' => 'string|min:2|max:255',
      'email' => 'required|string|email|max:255|unique:users',
      'password' => 'required|string|min:6|confirmed',
    ]);
    if ($validator->fails()) {
      return response()->json($validator->errors());
    }
    $user = User::create([
      'first_name' => $request->first_name,
      'last_name' => $request->last_name,
      'address' => $request->address,
      'phone_number' => $request->phone_number,
      'email' => $request->email,
      'password' => Hash::make($request->password),
    ]);
    return response()->json([
      'statusCode' => 201,
      'message' => 'User inserted successfully!',
      'content' => $user
    ]);
  }
  // login
  public function login(Request $request)
  {
    $validator = Validator::make($request->all(), [
      'email' => 'required|string|email|max:255',
      'password' => 'required|string|min:6'
    ]);
    if ($validator->fails()) {
      dd($validator->errors());
      return response()->json($validator->errors());
    }

    if (!$token = auth()->attempt($validator->validated())) {
      return response()->json([
        'statusCode' => 404,
        'message' => 'Email or password is incorrect!'
      ]);
    } else {
      $refreshToken = Hash::make($request->email . time());
      $tmpToken = JWTAuth::setToken($token);
      $payLoad = JWTAuth::getPayload($tmpToken)->toArray();
      $time_access_token = date('Y-m-d H:i:s', $payLoad['exp']);
      //create time exp for refresh token
      $time_refresh_token = Carbon::now()->addMinutes(config('jwt.refresh_ttl'))->format('Y-m-d H:m:i');
      // create record for table RefreshToken
      RefreshToken::create([
        'user_id' => auth()->user()->id,
        'refresh_token' => $refreshToken,
        'expiry' => Carbon::now()->addMinutes(config('jwt.refresh_ttl'))
      ]);
      return ($this->responseWithToken($token, $refreshToken, $time_access_token, $time_refresh_token));
    }
  }

  protected function responseWithToken($token, $refreshToken, $time_access_token, $time_refresh_token)
  {
    return response()->json([
      'statusCode' => 200,
      'message' => 'Login successful',
      'access_token' => $token,
      'access_token_exp' => $time_access_token,
      'refresh_token' => $refreshToken,
      'refresh_token_exp' => $time_refresh_token,
      'token_type' => 'Bearer',
    ]);
  }

  // logout
  public function logout(Request $request)
  {
    try {
      if(!$request->refresh_token){
        return response()->json(['statusCode' => 404, 'message' => 'Missing refresh_token!']);
      }
      RefreshToken::where('refresh_token', $request->refresh_token)->delete();
      auth()->logout();
      return response()->json(['statusCode' => 200, 'message' => 'User logged out!']);
    } catch (\Exception $e) {
      return response()->json(['statusCode' => 500, 'message' => $e->getMessage()]);
    }
  }
  // profile
  public function profile()
  {
    try {
      $user = User::where('email', auth()->user()->email)->with('permissions')->get();
      return response()->json(['statusCode' => 200, 'content' => $user]);
    } catch (\Exception $e) {
      return response()->json(['statusCode' => 500, 'message' => $e->getMessage()]);
    }
  }
  // update profile
  public function updateProfile(Request $request)
  {
    if (auth()->user()) {
      $validator = Validator::make($request->all(), [
        'id' => 'required',
        'first_name' => 'required|string|max:255',
        'last_name' => 'required|string|max:255',
        'email' => 'required|string|email|max:255',
      ]);
      if ($validator->fails()) {
        return response()->json($validator->errors());
      }
      $user = User::find($request->id);
      $user->name = $request->name;
      $user->email = $request->email;
      $user->save();
      return response()->json(['statusCode' => 200, 'message' => 'Updated user successfully!', 'content' => $user]);
    } else {
      return response()->json(['statusCode' => 404, 'message' => 'User is not Authenticated.']);
    }
  }
  // send verify email
  public function sendVerifyMail($email)
  {
    if (auth()->user()) {
      $user = User::where('email', $email)->get();
      if (count($user) > 0) {
        $random = Str::random(40);
        $domain = URL::to('/');
        $url = $domain . '/verify-mail/' . $random;
        $data['url'] = $url;
        $data['email'] = $email;
        $data['title'] = "Email verification!";
        $data['body'] = "Please click here to below to verify your email.";
        Mail::send('verifyMail', ['data' => $data], function ($message) use ($data) {
          $message->to($data['email'])->subject($data['title']);
        });
        $user = User::find($user[0]['id']);
        $user->remember_token = $random;
        $user->save();
        return response()->json(['success' => true, 'message' => 'Mail sent successfully.']);
      } else {
        return response()->json(['success' => false, 'message' => 'User not found!']);
      }
    } else {
      return response()->json(['success' => false, 'message' => 'User is not Authenticated.']);
    }
  }
  public function verificationMail($token)
  {
    $user = User::where('remember_token', $token)->get();
    if (count($user) > 0) {
      $datetime = Carbon::now()->format('Y-m-d H:i:s');
      $user = User::find($user[0]['id']);
      $user->remember_token = '';
      $user->email_verified_at = $datetime;
      $user->save();
      // return response()->json(['success' => true,'message' => 'Email vefiry successfully!']);
      return "<h1>Email verified successfully</h1>";
    } else {
      return view('404');
      // return response()->json(['success' => false,'message' => 'User not found!']);
    }
  }
  // refresh token
  protected function respondNewToken($token)
  {
    $tmpToken = JWTAuth::setToken($token);
    // get payload from token
    $payLoad = JWTAuth::getPayload($tmpToken)->toArray();
    //create time exp for access token (1min)
    $time_access_token = date('Y-m-d H:i:s', $payLoad['exp']);
    return response()->json([
      'statusCode' => 200,
      'access_token' => $token,
      'access_token_exp' => $time_access_token,
      // 'access_token_exp' => auth()->factory()->getTTL(),
    ]);
  }
  public function refreshToken(Request $request)
  {
    $checkRefreshToken = RefreshToken::where('refresh_token', $request->refresh_token)->get();
    if ($checkRefreshToken->isEmpty()) {
      return response()->json(['statusCode' => 404, 'message' => 'refresh_token does not exist']);
    } else {
      return $this->respondNewToken(auth()->refresh());
    }
  }
}
